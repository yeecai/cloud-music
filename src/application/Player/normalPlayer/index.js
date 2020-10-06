import React, { useRef } from "react";
import { getName } from "../../../api/utils";
import { CSSTransition } from "react-transition-group";
import { prefixStyle, formatPlayTime } from "../../../api/utils";
import ProgressBar from "../../../baseUI/progress-bar/index";
import Scroll from "../../../baseUI/scroll";
import { list } from "../../../api/config";
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
  ProgressWrapper,
  LyricWrapper,
  LyricContainer,
  List,
  ListItem,
} from "./style";
import animations from "create-keyframe-animation";

import { playMode } from "../../../api/config";

function NormalPlayer(props) {
  const {
    song,
    fullScreen,
    toggleFullScreen,
    playing,
    currentTime,
    mode,
    currentLineNum,
    currentPlayingLyric,
    currentLyric,
    speed
  } = props;
  const {
    onProgressChange,
    handleNext,
    handlePrev,
    changeMode,
    togglePlayList,
  } = props;

  const normalPlayerRef = useRef();
  const cdWrapperRef = useRef();
  const currentState = useRef("");
  const lyricScrollRef = useRef();
  const lyricLineRefs = useRef([]);

  const { clickPlaying } = props;

  const enter = () => {
    normalPlayerRef.current.style.display = "block";
    const { x, y, scale } = _getPosAndScale(); //get difference from miniPlayer's img and normalPlayers img
    let animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
      },
      60: {
        transform: `translate3d(0,0,0) scale(1.1)`,
      },
      100: {
        transform: `translate3d(0,0,0) scale(1)`,
      },
    };
    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 400,
        easing: "linear",
      },
    });
    animations.runAnimation(cdWrapperRef.current, "move");
  };
  const afterEnter = () => {
    const cdWrapperDom = cdWrapperRef.current;
    animations.unregisterAnimation("move");
    cdWrapperDom.style.animation = "";
  };

  const transform = prefixStyle("transform");

  const leave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "all 0.4s";
    const { x, y, scale } = _getPosAndScale();
    cdWrapperDom.style[
      transform
    ] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  };
  const afterLeave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "";
    cdWrapperDom.style[transform] = "";
    normalPlayerRef.current.style.display = "none";
  };

  const _getPosAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBotom = 30;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8;
    const scale = targetWidth / width;
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBotom;
    return {
      x,
      y,
      scale,
    };
  };
  const getPlayMode = () => {
    let content;
    if (mode === playMode.sequence) {
      content = "&#xe625;";
    } else if (mode === playMode.loop) {
      content = "&#xe653;";
    } else {
      content = "&#xe61b;";
    }
    return content;
  };

  const toggleCurrentState = () => {
    if (currentState.current !== "lyric") {
      currentState.current = "lyric";
    } else {
      currentState.current = "";
    }
  };

  const Speed = () => {
    return (
      <List>
        <span>Speed</span>
        {list.map((item) => {
          return (
            <ListItem
              key={item.key}
              // className={`${speed === item.key ? "selected" : ""}`}
              className={`${item.key===1.25?"selected" : ""}`}
            >
              {item.name}
            </ListItem>
          );
        })}
      </List>
    );
  };
  return (
    <CSSTransition
      in={fullScreen}
      classNames="normal"
      timeout={400}
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <NormalPlayerContainer ref={normalPlayerRef}>
        <div className="background ">
          <img
            src={song.al.picUrl + "?param=300x300"}
            width="100%"
            height="100%"
            alt="歌曲图片"
          />
        </div>
        <div className="background layer"></div>
        <Top className="top">
          <div className="back" onClick={() => toggleFullScreen(false)}>
            <i className="iconfont icon-back">&#xe662;</i>
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar)}</h1>
        </Top>
        <Middle ref={cdWrapperRef} onClick={toggleCurrentState}>
          <CSSTransition
            timeout={400}
            classNames="fade"
            in={currentState.current !== "lyric"}
          >
            <CDWrapper
              style={{
                visibility:
                  currentState.current !== "lyric" ? "visible" : "hidden",
              }}
            >
              <div className={`needle ${playing ? "" : "pause"}`}></div>
              <div className="cd">
                <img
                  className={`image play ${playing ? "" : "pause"}`}
                  src={song.al.picUrl + "?param=400x400"}
                  alt=""
                />
              </div>
              <p className="playing_lyric">{currentPlayingLyric}</p>
            </CDWrapper>
          </CSSTransition>
          <CSSTransition
            timeout={400}
            classNames="fade"
            in={currentState.current === "lyric"}
          >
            <LyricContainer>
              <Scroll ref={lyricScrollRef}>
                <LyricWrapper>
                  {currentLyric ? (
                    currentLyric.lines.map((item, index) => {
                      lyricLineRefs.current[index] = React.createRef();
                      return <p>{item.text}</p>;
                    })
                  ) : (
                    <p className="pure">纯音乐，请欣赏</p>
                  )}
                </LyricWrapper>
              </Scroll>
            </LyricContainer>
          </CSSTransition>
        </Middle>
        <Bottom className="bottom">
          <Speed/>
          <ProgressWrapper>
            <span className="time time-l">{formatPlayTime(currentTime)}</span>
            <div className="progress-bar-wrapper">
              <ProgressBar
                percent={0.2}
                percentChange={onProgressChange}
              ></ProgressBar>
            </div>
            <span className="time time-r">4:18</span>
          </ProgressWrapper>
          <Operators>
            <div className="icon i-left" onClick={changeMode}>
              <i
                className="iconfont"
                dangerouslySetInnerHTML={{ __html: getPlayMode() }}
              >
                {/* &#xe625; */}
              </i>
            </div>
            <div className="icon i-left">
              <i className="iconfont" onClick={handlePrev}>
                &#xe6e1;
              </i>
            </div>
            <div className="icon i-center" onClick={clickPlaying}>
              <i
                className="iconfont"
                onClick={(e) => clickPlaying(e, !playing)}
                dangerouslySetInnerHTML={{
                  __html: playing ? "&#xe723;" : "&#xe731;",
                }}
              ></i>
            </div>
            <div className="icon i-right">
              <i className="iconfont" onClick={handleNext}>
                &#xe718;
              </i>
            </div>
            <div className="icon i-right" onClick={() => togglePlayList(true)}>
              <i className="iconfont">&#xe640;</i>
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  );
}

export default React.memo(NormalPlayer);
// export const Top = styled.div`
//   position: relative;
//   margin-bottom: 25px;
//   .back {
//     position: absolute;
//     top: 0;
//     left: 6px;
//     font-size: 24px;
//     color: ${style["font-color-desc"]};
//     font-weight: bold;
//     transform: rotate(90deg);
//   }
//   .title {
//     width: 70%;
//     margin: 0 auto;
//     line-height: 40px;
//     text-align: center;
//     font-size: ${style["font-size-l"]};
//     color: ${style["font-color-desc"]};
//     // ${style.noWrap()};
//   }
//   .subtitle {
//     line-height: 20px;
//     text-align: center;
//     font-size: ${style["font-size-m"]};
//     color: ${style["font-color-desc-v2"]};
//     // ${style.noWrap()};
//   }
// `;
// export const Middle = styled.div`
//   postion: fixed;
//   width: 100%;
//   top: 80px;
//   bottom: 170px;
//   white-space: nowrap;
//   font-size: 0;
//   overflow: hidden;
// `;
// export const CDWrapper = styled.div`
//   width: 100%;
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   margin: auto;
//   display: flex;
//   justify-content: center;
//   box-sizing: border-box;
//   .needle {
//     position: absolute;
//     top: -6.67vw;
//     left: 48vw;
//     width: 25vw;
//     height: 40vw;
//     z-index: 100;
//     background-image: url(${needle});
//     ${style.bigFull()};
//     transform-origin: 4.5vw 4.5vw;
//     transition: all 0.3s;
//     tranform: rotate(0);
//     &.pause {
//       transform: rotate(-45deg);
//     }
//   }
//   .cd {
//     position: absolute;
//     top: 16%;
//     height: 70vw;
//     width: 70%;
//     border-radius: 50%;
//     background-image: url(${disc});
//     border: 4px solid ${style["border-color-v2"]};
//     border-radius: 50%;
//     ${style.bigFull()};
//     .image {
//       left: 0;
//       right: 0;
//       top: 0;
//       bottom: 0;
//       margin: auto;
//       position: absolute;
//       width: 68%;
//       height: 68%;
//       border-radius: 50%;

//       animation: ${rotate} 20s linear infinite;
//     }

//     .pause {
//       animation-play-state: paused;
//     }
//   }
// `;