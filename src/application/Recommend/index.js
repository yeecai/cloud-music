import React from 'react';
import Slider from "../../components/slider";
import RecommendList from '../../components/list'
import Scroll from '../../baseUI/scroll';
import Loading from '../../baseUI/loading'
import { Content } from './style';

import { connect } from 'react-redux'
import * as actionTypes from './store/actionCreators'
import { useEffect } from 'react';
import { forceCheck } from 'react-lazyload';
import { renderRoutes } from 'react-router-config';

// debugger
function Recommend(props) {
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;
  const { bannerList, recommendList, isLoading } = props

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch();
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch();
    }
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll className="list" 
      onScroll={forceCheck}
      // onScroll={() => alert("onScroll")}
      >
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {isLoading ? <Loading></Loading>: null}
      { renderRoutes(props.route.routes) }
    </Content>
  )
}

const mapStateToProps = (state) => ({
  //dont toJS data here 
  // otherwise cause extra re-render
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  isLoading: state.getIn(['recommend', 'isLoading'])
})

const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList())
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));