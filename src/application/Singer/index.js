import React, { useState, useCallback, useRef, useEffect } from "react";
import { connect } from 'react-redux';

import { CSSTransition } from "react-transition-group";
import { Container, SaveButton, ImgWrapper, BgLayer } from "./style";
import Header from "../../baseUI/header/index";
import SongList from "../SongList";
import MusicNote from "../../baseUI/music-note/index";
import { getSingerInfo, changeEnterLoading } from "./store/actionCreators";


const _artist = {
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
  const {
    artist: immutableArtist,
    songs: immutableSongs,
    loading,
  } = props;

  const { getSingerDataDispatch } = props;

  const artist = immutableArtist.toJS();
  const songs = immutableSongs.toJS();

  const [showStatus, setShowStatus] = useState(true);
  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);
  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({ x, y });
    console.log(x + y);
  };
  const musicNoteRef = useRef();


  useEffect(() => {
    const id = props.match.params.id;
    getSingerDataDispatch(id);
    // UI
  }, []);


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
          songs={songs}
          savedShow={false}
          musicAnimation={musicAnimation}
        />
        <MusicNote ref={musicNoteRef} />
      </Container>
    </CSSTransition>
  );
}

const mapStateToProps = state => ({
  artist: state.getIn(["singerInfo", "artist"]),
  songs: state.getIn(["singerInfo", "songsOfArtist"]),
  loading: state.getIn(["singerInfo", "loading"]),
});

const mapDispatchToProps = dispatch => {
  return {
    getSingerDataDispatch(id) {
      dispatch(changeEnterLoading(true));
      dispatch(getSingerInfo(id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer));
