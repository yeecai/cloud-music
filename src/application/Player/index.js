//Player/index.js
import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import MiniPlayer from "./miniPlayer";
import NormalPlayer from "./normalPlayer";
import Toast from "./../../baseUI/Toast";
import PlayList from "./playList";
import Lyric from "./../../api/lyric-parser";

import {
  changePlayingState,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  changeFullScreen,
} from "./store/actionCreators";
import { playMode } from "../../api/config";

import { getSongUrl, isEmptyObject, findIndex, shuffle } from "../../api/utils";
import { getLyricRequest } from "../../api/request";

function Player(props) {
  const {
    fullScreen,
    playing,
    currentIndex,
    currentSong: immutableCurrentSong,
    playList: immutablePlayList,
    mode,
    sequencePlayList: immutableSequencePlayList,
    showPlayList,
  } = props;
  const [currentTime, setCurrentTIme] = useState(0);
  const [duration, setDuration] = useState(0);
  const [modeText, setModeText] = useState("");
  const currentLyric = useRef();

  const {
    toggleFullScreenDispatch,
    togglePlayingDispatch,
    changeCurrentIndexDispatch,
    changeCurrentDispatch,
    changeModeDispatch,
    changePlayListDispatch,
    togglePlayListDispatch,
  } = props;

  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
  const playList = immutablePlayList.toJS();
  let currentSong = immutableCurrentSong.toJS();
  const sequencePlayList = immutableSequencePlayList.toJS();
  const [preSong, setPreSong] = useState({});
  const audioRef = useRef();
  const toastRef = useRef();
  const [currentPlayingLyric, setPlayingLyric] = useState("");
  const currentLineNum = useRef(0);

  useEffect(() => {
    // changeCurrentIndexDispatch(0);
  });

  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id
    )
      return;
    let current = playList[currentIndex];
    getLyric(current.id);
    changeCurrentDispatch(current);
    setPreSong(current);
    audioRef.current.src = getSongUrl(current.id);
    setTimeout(() => {
      audioRef.current.play();
    });
    togglePlayingDispatch(true);
    setCurrentTIme(0);
    setDuration((current.dt / 1000) | 0);
  }, [playList, currentIndex]);

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  // useEffect(() => {
  //   if (!lyricScrollRef.current) return;
  //   let bScroll = lyricScrollRef.current.getBScroll();
  // });
  const handleLyric = ({ lineNum, text }) => {
    if (!currentLyric.current) return;
    currentLineNum.current = lineNum;
    setPlayingLyric(text);
  };

  const getLyric = (id) => {
    let lyric = "";
    if (currentLyric.current) {
      currentLyric.current.stop();
    }
    getLyricRequest(id)
      .then((data) => {
        lyric = data.lrc.lyric;
        if (!lyric) {
          currentLyric.current = null;
          return;
        }
        currentLyric.current = new Lyric(lyric, handleLyric);
        currentLyric.current.play();
        currentLineNum.current = 0;
        currentLyric.current.seek(0);
      })
      .catch(() => {
        // songReady.current = true;
        audioRef.current.play();
      });
  };
  const clickPlaying = (e, state) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
    if (currentLyric.current) {
      currentLyric.current.togglePlay(currentTime * 1000);
    }
  };
  const onProgressChange = (curPercent) => {
    const newTime = curPercent * duration;
    setCurrentTIme(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      togglePlayingDispatch(true);
    }
    if (currentLyric.current) {
      currentLyric.current.seek(newTime * 1000);
    }
  };
  const updateTime = (e) => {
    setCurrentTIme(e.target.currentTime);
  };

  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    changePlayingState(true);
    audioRef.current.play();
  };

  const handlePrev = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) index = playList.length - 1;
    if (!playing) togglePlayingDispatch(true);
    changeCurrentIndexDispatch(index);
  };

  const handleNext = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) togglePlayingDispatch(true);
    changeCurrentIndexDispatch(index);
  };

  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop();
    } else {
      handleNext();
    }
  };

  const handleError = (e) => {
    console.log(e);
  };
  const changeMode = () => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      changePlayListDispatch(sequencePlayList);
      let index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
      setModeText("sequence");
    } else if (newMode === 1) {
      changePlayListDispatch(sequencePlayList);
      setModeText("single loop");
    } else if (newMode === 2) {
      let newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
      setModeText("random");
    }
    changeModeDispatch(newMode);
    toastRef.current.show();
  };

  return (
    <div>
      {isEmptyObject(currentSong) ? null : (
        <>
          <MiniPlayer
            song={currentSong}
            fullScreen={fullScreen}
            playing={playing}
            percent={percent}
            toggleFullScreen={toggleFullScreenDispatch}
            clickPlaying={clickPlaying}
            togglePlayList={togglePlayListDispatch}
          />
          <NormalPlayer
            song={currentSong}
            fullScreen={fullScreen}
            playing={playing}
            duration={duration} //总时长
            currentTime={currentTime} //播放时间
            percent={percent} //进度
            onProgressChange={onProgressChange}
            toggleFullScreen={toggleFullScreenDispatch}
            clickPlaying={clickPlaying}
            handlePrev={handlePrev}
            handleNext={handleNext}
            mode={mode}
            changeMode={changeMode}
            togglePlayList={togglePlayListDispatch}
            currentLyric={currentLyric.current}
            currentPlayingLyric={currentPlayingLyric}
            currentLineNum={currentLineNum.current}
          />
        </>
      )}
      <audio
        ref={audioRef}
        onTimeUpdate={updateTime}
        onEnded={handleEnd}
        onError={handleError}
        autoplay={false}
        muted={true}
      ></audio>
      {playList ? (
        <PlayList
          showPlayList={showPlayList}
          togglePlayList={togglePlayListDispatch}
        ></PlayList>
      ) : null}
      <Toast text={modeText} ref={toastRef}></Toast>
    </div>
  );
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  fullScreen: state.getIn(["player", "fullScreen"]),
  playing: state.getIn(["player", "playing"]),
  currentSong: state.getIn(["player", "currentSong"]),
  showPlayList: state.getIn(["player", "showPlayList"]),
  mode: state.getIn(["player", "mode"]),
  currentIndex: state.getIn(["player", "currentIndex"]),
  playList: state.getIn(["player", "playList"]),
  sequencePlayList: state.getIn(["player", "sequencePlayList"]),
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    togglePlayingDispatch(data) {
      dispatch(changePlayingState(data));
    },
    toggleFullScreenDispatch(data) {
      dispatch(changeFullScreen(data));
    },
    togglePlayListDispatch(data) {
      dispatch(changeShowPlayList(data));
    },
    changeCurrentIndexDispatch(index) {
      dispatch(changeCurrentIndex(index));
    },
    changeCurrentDispatch(data) {
      dispatch(changeCurrentSong(data));
    },
    changeModeDispatch(data) {
      dispatch(changePlayMode(data));
    },
    changePlayListDispatch(data) {
      dispatch(changePlayList(data));
    },
  };
};

// 将 ui 组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player));
