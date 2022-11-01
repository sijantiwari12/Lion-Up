export const createNewDiscussion = (user, photoURL, discussion) => {
    return{
        ...discussion,
        creatorUid: user.uid,
        createdBy: user.displayName,
        creatorPhotoURL: photoURL || '/assets/user.png',
        createdAt: new Date()
    }
}

export const object_Array = (object) => {
    if (object) {
        return Object.entries(object).map(a => Object.assign({}, a[1], {id: a[0]}))
    }
}

export const createData_Tree = dataset => {
    let hashTable = Object.create(null);
    dataset.forEach(a => hashTable[a.id] = {...a, childNodes: []});
    let dataTree = [];
    dataset.forEach(a => {
        if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
        else dataTree.push(hashTable[a.id])
    });
    return dataTree
};