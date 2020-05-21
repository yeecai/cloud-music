import React, { useState } from 'react';
import Horizon from '../../baseUI/horizon-item'
import { categoryTypes, alphaTypes } from '../../api/config'
import { NavContainer, List, ListItem, ListContainer } from './style'
import Scroll from '../../baseUI/scroll';
import {
  getSingerList,
  getTopSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreTopSingerList,
} from './store/actionCreators';
import { connect } from 'react-redux'

// div width should be fixed, and 2 Horizon's width should be wider than div
function Singers(props) {
  let [category, setCategory] = useState('')
  let [alpha, setAlpha] = useState('')

  let handleUpdateCategory = (val) => {
    setCategory(val)
    updateDispatch(category, val)
  }

  let handleUpdateAlpha = (val) => {
    setAlpha(val)
    updateDispatch(val, alpha)
  }

  const { getTopSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props;
  const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props;


  // const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(item => {
  //   return {
  //     picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
  //     name: 'singer',
  //     accountId: 277313426
  //   }
  // })


  const renderSingerList = () => {
    const list = singerList ? singerList.toJS() : [];
    return (
      <List>
        {
          list.map((item, index) => {
            return (
              <ListItem key={item.accountId + '' + index}>
                <div className='img_wrapper'>
                  <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                </div>
                {item.name}
              </ListItem>
            )
          })
        }
      </List>
    )
  }
  return (
    <div>
      <NavContainer>
        <Horizon list={categoryTypes}
          title={"category:"}
          handleClick={handleUpdateCategory}
          oldVal={category}
        ></Horizon>
        <Horizon
          list={alphaTypes}
          title={"首字母:"}
          handleClick={val => handleUpdateAlpha(val)}
          oldVal={alpha}
        ></Horizon>
      </NavContainer>
      <ListContainer>
        <Scroll>
          {renderSingerList()}
        </Scroll>
      </ListContainer>
    </div>
  )
}
const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCountL: state.getIn(['singers', 'pageCount'])
})

const mapDispatchToProps = (dispatch) => {
  return {
    getTopSingerDispatch() {
      dispatch(getTopSingerList())
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0))
      dispatch(changeEnterLoading(true))
      dispatch(getSingerList(category, alpha))
    },
    pullUpRefreshDispatch(category, alpha, top, count) {
      dispatch(changePullUpLoading(true))
      dispatch(changePageCount(count + 1))
      if (top) {
        dispatch(refreshMoreTopSingerList())
      } else {
        dispatch(refreshMoreSingerList(category, alpha))
      }
    },
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true))
      dispatch(changePageCount(0))
      if (category === '' && alpha === '') {
        dispatch(getTopSingerList())
      } else {
        dispatch(getSingerList(category, alpha))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));