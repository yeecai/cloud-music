import React, { useState,useCallback, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Container, SaveButton, ImgWrapper, BgLayer } from "./style";
import Header from "../../baseUI/header/index";
import SongList from "../SongList";
import MusicNote from "../../baseUI/music-note/index";


const artist = {
  picUrl:
    "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
  name: "薛之谦",
  hotSongs: [
    {
      name: "我好像在哪见过你",
      ar: [{ name: "薛之谦" }],
      al: {
        name: "薛之谦专辑",
      },
    },
    {
      name: "我好像在哪见过你",
      ar: [{ name: "薛之谦" }],
      al: {
        name: "薛之谦专辑",
      },
    },
    // 省略 20 条
  ],
};

function Singer(props) {
  const [showStatus, setShowStatus] = useState(true);
  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);
  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({ x, y });
    console.log(x + y);
  };
  const musicNoteRef = useRef ();
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container>
        <Header title={artist.name} handleClick={handleBack}></Header>
        <div className="filter"></div>
        <ImgWrapper url={artist.picUrl}></ImgWrapper>
        <SaveButton>
          <i className="iconfont">&#xe62d;</i>
          <span className="text">Save </span>
        </SaveButton>
        <BgLayer></BgLayer>
        {/* <SongListWrapper> */}
        {/* </SongListWrapper> */}
            <SongList
            songs ={ artist.hotSongs}
            savedShow = {false}
            musicAnimation={musicAnimation}
            />
            <MusicNote ref={musicNoteRef} />
      </Container>
    </CSSTransition>
  );
}

export default React.memo(Singer);
