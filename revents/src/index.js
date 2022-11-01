import React from "react";
import ReactDOM from "react-dom";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import "./index.css";
import { Provider } from "react-redux";
import ReduxToastr from 'react-redux-toastr';
import App from "./app/layout/App";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "./app/store/configureStore";
import ScrollToTop from './app/common/util/ScrollToTop';

const rootEl = document.getElementById("root");

const store = configureStore();

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
       <ScrollToTop>
         <ReduxToastr 
            position='bottom-right'
            transitionIn='fadeIn'
            transitionOut='fadeOut'
         />
          <App />
       </ScrollToTop>
       
      </BrowserRouter>
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept("./app/layout/App", () => {
    setTimeout(render);
  });
}

store.firebaseAuthIsReady.then(() => {
  render();
})

