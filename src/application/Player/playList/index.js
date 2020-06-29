import React from 'react';
import {connect} from "react-redux";
import { PlayListWrapper, ScrollWrapper } from './style';
function PlayList (props) {
  return (
    <PlayListWrapper>
      <div className="list_wrapper">
        <ScrollWrapper></ScrollWrapper>
      </div>
    </PlayListWrapper>
  )
}
export default PlayList;