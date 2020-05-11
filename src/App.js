import React from 'react';
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import { renderRoutes } from 'react-router-config';
import { Provider } from "react-redux";
import store from './store/index'

import routes from './routes'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {renderRoutes(routes)}
      </Router>
    </Provider>
  );
}

export default App;