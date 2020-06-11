import React, { useState, useEffect } from "react";
import { Container } from "./style";
import { CSSTransition } from "react-transition-group";
import Header from "./../../baseUI/header/index";
import Scroll from "../../baseUI/scroll";
import { getName, isEmptyObject } from "../../api/utils";
import { TopDesc, Menu, SongItem, SongList } from "./style";
import { connect } from "react-redux";
import { getAlbumList, changeEnterLoading } from "./store/actionCreators";

function Album(props) {
  const [showStatus, setShowStatus] = useState(true);

  const id = props.match.params.id;
  const { currentAlbum: currentAlbumImmutable, enterLoading } = props;
  const { getAlbumDataDispatch } = props;

  useEffect(() => {
    getAlbumDataDispatch(id);
  }, [getAlbumDataDispatch, id]);
  const handleBack = () => {
    setShowStatus(false);
  };

  let currentAlbum = currentAlbumImmutable.toJS();
  const renderSongList = () => {
    return (
      <SongList>
        <div className="songlist_top">
          <div className="play_all">
            <i className="iconfont">&#xe6e3;</i>
            Play all<span>({currentAlbum.tracks.length} in total)</span>
          </div>
          <div className="save">
            <span>
              {" "}
              <i className="iconfont">&#xe62d;</i>
              Save(29K)
            </span>
          </div>
        </div>
        <SongItem>
          {currentAlbum.tracks.map((item, index) => {
            return (
              <li key={index}>
                <span className="index">{index + 1}</span>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    {getName(item.ar)} - {item.al.name}
                  </span>
                </div>
              </li>
            );
          })}
        </SongItem>
      </SongList>
    );
  };
  return (
    // <div>test</div>
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
            <TopDesc background={currentAlbum.coverImgUrl}>
              <div className="background">
                <div className="filter"></div>
              </div>
              <div className="img_wrapper_left">
                <div className="decorate"></div>
                <img src={currentAlbum.coverImgUrl} alt="" />
                <div className="play_amount">
                  <i className="iconfont play">&#xe885;</i>
                  {/* TODO: headphone icon */}
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
            {renderSongList()}
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
