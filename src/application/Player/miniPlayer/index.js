import React, { useRef } from "react";
import { MiniPlayerContainer } from "./style";
import { getNameByJoin } from "../../../api/utils";
import { CSSTransition } from "react-transition-group";
import ProgressCircle from "../../../baseUI/process-circle";

function MiniPlayer(props) {
  const { song, playing, fullScreen } = props;
  const { toggleFullScreen } = props;
  const miniPlayerRef = useRef();
  let percent = 0.2;

  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames="mini"
      onEnter={() => {
        miniPlayerRef.current.style.display = "flex";
      }}
      onExited={() => {
        miniPlayerRef.current.style.display = "none";
      }}
    >
      <MiniPlayerContainer
        ref={miniPlayerRef}
        onClick={() => toggleFullScreen(true)}
      >
        <div className="icon">
          <div className="imgWrapper">
            <img
              className={`${playing ? "play" : "pause"}`}
              src={song.al.picUrl}
              width="40"
              height="40"
              alt="img"
            />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getNameByJoin(song.ar)}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={percent}>
            <i className="iconfont icon-mini">&#xe650;</i>
          </ProgressCircle>
        </div>
        <div className="control">
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  );
}

export default React.memo(MiniPlayer);
