import { asyncActionFinish, asyncActionError, asyncActionStart } from "../async/aysncActions";
import cuid from "cuid";
import {toastr} from "react-redux-toastr";
import firebase from '../../app/config/firebase';
import { ASYNC_ACTION_ERROR } from "../async/asyncConstants";

export const updateProfile = user => async (
    dispatch,
    getState,
    { getFirebase }
  ) => {
    const firebase = getFirebase();
    const { isLoaded, isEmpty, ...updatedUser } = user;
    try {
      await firebase.updateProfile(updatedUser);
      toastr.success('Success', 'Your profile has been updated');
    } catch (error) {
      console.log(error);
    }
  };

export const uploadProfileImage = (file, fileName) => 
    async (dispatch, getState, {getFirebase, getFirestore}) =>{
        const imageName = cuid();
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`;
        const options = {
            name: imageName
        };
        try {
            dispatch(asyncActionStart())
            // upload the file to firebase storage
            let uploadedFile = await firebase.uploadFile(path, file, null, options)
            // get url of the image
            let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
            // get userdoc 
            let userDoc = await firestore.get(`users/${user.uid}`);
            // check if user has photo, if not update profile
            if (!userDoc.data().photoURL){
                await firebase.updateProfile({
                    photoURL: downloadURL
                });
                await user.updateProfile({
                        photoURL:downloadURL
                })
            }
            
            // add the image to firestore
            await firestore.add({
                collection: 'users',
                doc: user.uid,
                subcollections: [{collection: 'photos'}]
            },{
                name: imageName,
                url: downloadURL
            })
            dispatch(asyncActionFinish())
        }
        catch(error){
            console.log(error)
            dispatch(asyncActionError())
        }
    }

export const deletePhoto = photo => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
  ) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    try {
      await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
      await firestore.delete({
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos', doc: photo.id }]
      });
    } catch (error) {
      console.log(error);
      throw new Error('Problem deleting the photo');
    }
  };

export const setMainPhoto = photo => 
    async (dispatch, getState)=>{
        const firestore = firebase.firestore();
        const user = firebase.auth().currentUser;
        let userDocRef = firestore.collection('users').doc(user.uid);
        let eventAttendeeRef = firestore.collection('event_attendee');
        try{
           dispatch(asyncActionStart())
           let batch = firestore.batch();
           batch.update(userDocRef, {
             photoURL: photo.url
           })

           let eventQuery = await eventAttendeeRef
              .where('userUid','==', user.uid)
               
              let eventQuerySnap = await eventQuery.get();

              for (let i=0; i<eventQuerySnap.docs.length; i++){
                let eventDocRef = await firestore 
                  .collection('events')
                  .doc(eventQuerySnap.docs[i].data().eventId);
                let event = await eventDocRef.get();
                if(event.data().hostUid === user.uid){
                  batch.update(eventDocRef,{
                    hostPhotoURL: photo.url,
                    [`attendees.${user.uid}.photoURL`]:photo.url
                  })
                }
                else{
                  batch.update(eventDocRef, {
                    [`attendees.${user.uid}.photoURL`]:photo.url
                  })
                }
              }
              console.log(batch);
              await batch.commit();
              dispatch(asyncActionFinish())
        }
        catch(error){
            console.log(error);
            dispatch(ASYNC_ACTION_ERROR())
            throw new Error('Problem setting new profile picture')
        }
    }

    export const goingToEvent = (event) => 
      async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const profile = getState().firebase.profile;
        const attendee = {
          going: true,
          joinDate: firestore.FieldValue.serverTimestamp(),
          photoURL: profile.photoURL || '/assets/user.png',
          displayName: profile.displayName,
          host: false
        }
        try{
            await firestore.update(`events/${event.id}`, {
                [`attendees.${user.uid}`]: attendee
            })
            await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
              eventId: event.id,
              userUid: user.uid,
              host: false
            })
            toastr.success('Success', 'You have signed up for this event');
        }
        catch(error){
          console.log(error);
          toastr.error('Oops', 'Problem signing up for the event!');
        }

      }

      export const cancelGoingToEvent = event => async (
        dispatch,
        getState,
        { getFirestore, getFirebase }
      ) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        try {
          await firestore.update(`events/${event.id}`, {
            [`attendees.${user.uid}`]: firestore.FieldValue.delete()
          });
          await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
          toastr.success('Success', 'You have removed yourself from the event');
        } catch (error) {
          console.log(error);
          toastr.error('Oops', 'Something went wrong');
        }
      };