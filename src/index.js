import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import i18n from './i18n';
// import { I18nextProvider } from 'react-i18next'

const Loader = () => (
  <div className="App">
    {/* <img src={logo} className="App-logo" alt="logo" /> */}
    <div>loading...</div>
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      {/* <I18nextProvider i18n={i18n} > */}
        <App />
      {/* </I18nextProvider> */}
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
