import React from 'react';
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import { renderRoutes } from 'react-router-config';
import routes from './routes'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      {renderRoutes(routes)}
    </Router>
  );
}

export default App;