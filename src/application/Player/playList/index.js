import React, { useState, useCallback, useRef } from 'react';
import { connect } from "react-redux";
import { CSSTransition } from 'react-transition-group';
import { PlayListWrapper, ScrollWrapper, ListContent, ListHeader } from './style';
import { prefixStyle, getName } from './../../../api/utils';
import { changeCurrentIndex, changePlayMode, changePlayList } from "../store/actionCreators";
import { playMode } from "../../../api/config";
import Scroll from '../../../baseUI/scroll';
import { deleteSong } from "../store/actionCreators";
import Confirm from '../../../baseUI/confirm';
import { changeSequecePlayList, changeShowPlayList, changeCurrentSong, changePlayingState } from '../store/actionCreators';

function PlayList(props) {
  const { showPlayList,
    mode,
    currentSong: immutableCurrentSong,
    sequencePlayList: immutableSequencePlayList,
    playList: immutablePlayList,
    currentIndex
  } = props;
  const { togglePlayList, changeCurrentIndexDispatch, deleteSongDispatch, clearDispatch } = props;
  const [isShow, setIsShow] = useState(false);
  const listWrapperRef = useRef();
  const playListRef = useRef();
  const confirmRef = useRef();

  const transform = prefixStyle("transform");
  const [modeText, setModeText] = useState("");
  const [canTouch, setCanTouch] = useState(true)
  const [initialed, setInitialed] = useState(0);
  const [startY, setStartY] = useState(0);
  const [distance, setDistance] = useState(0);

  const currentSong = immutableCurrentSong.toJS();
  const playList = immutablePlayList.toJS();
  const sequencePlayList = immutableSequencePlayList.toJS()

  const onEnterCB = useCallback(() => {
    setIsShow(true);
    listWrapperRef.current.style[transform] = `translate3d(0, 100%, 0)`
  }, [transform]);

  const onEnteringCB = useCallback(() => {
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style[transform] = `translate3d(0, 0, 0)`;
  }, [transform]);

  const onExitingCB = useCallback(() => {
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style[transform] = `translate3d(0, 100%, 0)`;
  }, [transform]);
  const onExitedCB = useCallback(() => {
    setIsShow(false);
    listWrapperRef.current.style[transform] = `translate3d(0, 0%, 0)`;
  }, [transform]);

  const getPlayMode = () => {
    let content, text;
    if (mode === playMode.sequence) {
      content = "&#xe625;";
      text = "sequence";
    } else if (mode === playMode.loop) {
      content = "&#xe653;";
      text = "single loop";
    } else {
      content = "&#xe61b;";
      text = "random";
    }

    return (
      <div>
        <i className="iconfont" onClick={(e) => changeMode(e)} dangerouslySetInnerHTML={{ __html: content }}></i>
        <span className="text" onClick={(e) => changeMode(e)}>{text}</span>
      </div>
    )
  }
  const changeMode = () => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      // changePlayListDispatch(sequencePlayList);
      // let index = findIndex(currentSong, sequencePlayList);
      // changeCurrentIndexDispatch(index);
      // setModeText("sequence");
    } else if (newMode === 1) {
      // changePlayListDispatch(sequencePlayList);
      // setModeText("single loop");
    } else if (newMode === 2) {
      // let newList = shuffle(sequencePlayList);
      // let index = findIndex(currentSong, newList);
      // changePlayListDispatch(newList);
      // changeCurrentIndexDispatch(index);
      // setModeText("random");
    }
    // changeModeDispatch(newMode);
  };

  const getCurrentIcon = (item) => {
    const current = item.id === currentSong.id;
    const className = current ? 'icon-play' : '';
    const content = current ? '&#xe6e3;' : '';
    return (<i className={`current iconfont ${className}`} dangerouslySetInnerHTML={{ __html: content }}></i>)
  }

  const handleShowClear = () => {
    confirmRef.current.show();
  }
  const handleChangeCurrentIndex = (index) => {
    if (currentIndex === index) return;
    changeCurrentIndexDispatch(index);
  }

  const handleDeleteSong = (e, song) => {
    e.stopPropagation();
    deleteSongDispatch(song);
  };

  const handleConfirmClear = () => {
    clearDispatch();
  }

  const handleTouchStart = (e) => {
    if(!canTouch || initialed) return
    listWrapperRef.current.style['transition'] = ""
    setStartY(e.nativeEvent.touches[0].pageY);
    setInitialed(true)
  }

  const handleTouchMove = (e) => {
    if(!canTouch || !initialed) return
    let distance = e.nativeEvent.touches[0].pageY - startY;
    if(distance < 0) return;
    setDistance(distance)
    listWrapperRef.current.style.transform = `translate3d(0, ${distance})`
  }

  const handleTouchEnd = (e) => {
    if(!canTouch || !initialed) return
    if(distance >= 150) {
      togglePlayList(false)
    } else {
      listWrapperRef.current.style['transition'] = 'all 0.3s';
      listWrapperRef.current.style[transform] = `translate3d(0p, 0px, 0px)`
    }

  }

  const listContentRef = useRef()

  const handleScroll = (pos) => {
    let state = pos.y === 0
    setCanTouch(state)
  }

  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
    >
      <PlayListWrapper
        ref={playListRef}
        style={isShow === true ? { display: "block" } : { display: "none" }}
        onClick={() => togglePlayList(false)}
      >
        <div className="list_wrapper"
          ref={listWrapperRef}
          onClick={e => e.stopPropagation()}
          onTouchEnd={handleTouchEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <ListHeader>
            <h1 className="title">
              {getPlayMode()}
              <span className="iconfont clear" onClick={handleShowClear}>&#xe63d;</span>
            </h1>
          </ListHeader>
          <ScrollWrapper>
            <ListContent>
              <Scroll
                ref={listContentRef}
                onScroll={pos => handleScroll(pos)}
                bounceTop={false}
              >
                {playList ? playList.map((item, index) => {
                  return (
                    <li className="item" key={item.id} onClick={() => handleChangeCurrentIndex(index)}>
                      {getCurrentIcon(item)}
                      <span className="text">{item.name} -  {item.ar ? getName(item.ar) : "/"}</span>
                      <span className="like">
                        <i className="iconfont">&#xe601;</i>
                      </span>
                      <span className="delete" onClick={(e) => handleDeleteSong(e, item)}>
                        <i className="iconfont">&#xe63d;</i>
                      </span>
                    </li>
                  )
                }) : null}
              </Scroll>
            </ListContent>
          </ScrollWrapper>
          <Confirm
            ref={confirmRef}
            text={"是否删除全部？"}
            cancelBtnText={"取消"}
            confirmBtnText={"确定"}
            handleConfirm={handleConfirmClear}
          />
        </div>
      </PlayListWrapper>
    </CSSTransition>

  )
}
const mapStateToProps = (state) => ({
  currentIndex: state.getIn(['player', 'currentIndex']),
  currentSong: state.getIn(['player', 'currentSong']),
  playList: state.getIn(['player', 'playList']),
  sequencePlayList: state.getIn(['player', 'sequencePlayList']),
  mode: state.getIn(['player', 'mode'])
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentIndexDispatch(data) {
      dispatch(changeCurrentIndex(data));
    },
    changeModeDispatch(data) {
      dispatch(changePlayMode(data));
    },
    changePlayListDispatch(data) {
      dispatch(changePlayList(data));
    },
    deleteSongDispatch(data) {
      dispatch(deleteSong(data));
    },
    clearDispatch() {
      // 1. 清空两个列表
      dispatch(changePlayList([]));
      dispatch(changeSequecePlayList([]));
      // 2. 初始 currentIndex
      dispatch(changeCurrentIndex(-1));
      // 3. 关闭 PlayList 的显示
      dispatch(changeShowPlayList(false));
      // 4. 将当前歌曲置空
      dispatch(changeCurrentSong({}));
      // 5. 重置播放状态
      dispatch(changePlayingState(false));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PlayList));
