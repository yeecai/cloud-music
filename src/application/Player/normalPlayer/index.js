import React, { useRef } from "react";
import { getName } from "../../../api/utils";
import { CSSTransition } from "react-transition-group";
import { prefixStyle } from "../../../api/utils";

import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
} from "./style";
import animations from "create-keyframe-animation";


function NormalPlayer(props) {
  const { song, fullScreen, toggleFullScreen } = props;
  const normalPlayerRef = useRef();
  const cdWrapperRef = useRef();

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

  const transform = prefixStyle("transform")

  const leave = () => {
      if(!cdWrapperRef.current) return;
      const cdWrapperDom = cdWrapperRef.current;
      cdWrapperDom.style.transition = "all 0.4s";
      const { x, y, scale} = _getPosAndScale();
      cdWrapperDom.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  }
  const afterLeave = () => {
    if(!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "";
    cdWrapperDom.style[transform] = '';
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
        <Middle ref={cdWrapperRef}>
          <CDWrapper>
            <div className="cd">
              <img
                className="image play"
                src={song.al.picUrl + "?param=400x400"}
                alt=""
              />
            </div>
          </CDWrapper>
        </Middle>
        <Bottom className="bottom">
          <Operators>
            <div className="icon i-left">
              <i className="iconfont">&#xe625;</i>
            </div>
            <div className="icon i-left">
              <i className="iconfont">&#xe6e1;</i>
            </div>
            <div className="icon i-center">
              <i className="iconfont">&#xe723;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe718;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe640;</i>
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  );
}

export default React.memo(NormalPlayer);
