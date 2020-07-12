import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container } from "./style";
import { CSSTransition } from "react-transition-group";
import Header from "./../../baseUI/header/index";
import Scroll from "../../baseUI/scroll";
import { isEmptyObject } from "../../api/utils";
import { TopDesc, Menu } from "./style";
import { connect } from "react-redux";
import { getAlbumList, changeEnterLoading } from "./store/actionCreators";
import SongList from "../SongList";
import { HEADER_HEIGHT } from './../../api/config';
import style from "../../assets/global-style";
import MusicNote from "../../baseUI/music-note/index";

function Album(props) {
  const [showStatus, setShowStatus] = useState(true);
  const [isMarquee, setIsMarquee] = useState(false);//是否跑马灯
  const headerEl = useRef();

  const id = props.match.params.id;
  const { currentAlbum: currentAlbumImmutable, enterLoading } = props;
  const { getAlbumDataDispatch } = props;

  const [title, setTitle] = useState("歌单");
  const musicNoteRef = useRef()
  useEffect(() => {
    getAlbumDataDispatch(id);
  }, [getAlbumDataDispatch, id]);

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  let currentAlbum = currentAlbumImmutable.toJS();
 
  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({ x, y });
  }
  const handleScroll = useCallback(
    (pos) => {
      let minScrollY = -HEADER_HEIGHT;
      let percent = Math.abs(pos.y / minScrollY);
      let headerDom = headerEl.current;
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = style["theme-color"];
        headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
        setTitle(currentAlbum.name);
        setIsMarquee(true);
      } else {
        headerDom.style.backgroundColor = "";
        headerDom.style.opacity = 1;
        setTitle("歌单");
        setIsMarquee(false);
      }
    },
    [currentAlbum]
  );
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container>
        <Header title="back" handleClick={handleBack}></Header>
        {!isEmptyObject(currentAlbum) ? (
          <Scroll>
          {/* </Scroll> onScroll={handleScroll}> */}
          <div>
            <TopDesc background={currentAlbum.coverImgUrl}>
              <div className="background">
                <div className="filter"></div>
              </div>
              <div className="img_wrapper_left">
                <div className="decorate"></div>
                <img src={currentAlbum.coverImgUrl} alt="" />
                <div className="play_amount">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="amount">{`${Math.floor(
                    currentAlbum.subscribedCount / 1000
                    )}W`}</span>
                </div>
              </div>
              <div className="desc_wrapper_right">
                <div className="title">{currentAlbum.name}</div>
                <div className="author">
                  <div className="avatar">
                    <img src={currentAlbum.creator.avatarUrl} alt="" />
                  </div>
                  <div className="name">{currentAlbum.creator.username}</div>
                </div>
              </div>
            </TopDesc>
            <Menu>
              <div>
                <i className="iconfont">&#xe6ad;</i>
                Comment
              </div>
              <div>
                <i className="iconfont">&#xe86f;</i>
                Like
              </div>
              <div>
                <i className="iconfont">&#xe62d;</i>
                Save
              </div>
              <div>
                <i className="iconfont">&#xe606;</i>
                More
              </div>
            </Menu>
            <SongList
              savedCount={currentAlbum.subscribedCount}
              songs={currentAlbum.tracks}
              showSaved={true}
              musicAnimation={musicAnimation}
            />
            <MusicNote ref={musicNoteRef} />
            </div>
          </Scroll>
        ) : null}
      </Container>
    </CSSTransition>
  );
}
const mapStateToProps = (state) => ({
  currentAlbum: state.getIn(["album", "currentAlbum"]),
  enterLoading: state.getIn(["album", "enterLoading"]),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAlbumDataDispatch(id) {
      dispatch(changeEnterLoading(true));
      dispatch(getAlbumList(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
