import React, { useState, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import SearchBox from "./../../baseUI/search-box/index";
import {
  getHotKeyWords,
  changeEnterLoading,
  getSuggestList,
} from "./store/actionCreators";
import { connect } from "react-redux";
import { Container, ShortcutWrapper, HotKey } from "./style";
import Scroll from "../../baseUI/scroll";
import Loading from "./../../baseUI/loading/index";
import LazyLoad, { forceCheck } from "react-lazyload";
import { List, ListItem, SongItem } from "./style";

function Search(props) {
  const {
    hotList,
    enterLoading,
    suggestList: immutableSuggestList,
    songsCount,
    songsList: immutableSongsList,
  } = props;

  const suggestList = immutableSuggestList.toJS();
  const songsList = immutableSongsList.toJS();

  const {
    getHotKeyWordsDispatch,
    changeEnterLoadingDispatch,
    getSuggestListDispatch,
    getSongDetailDispatch,
  } = props;

  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("歌手");

  const searchBack = useCallback(() => {
    setShow(false);
  }, []);

  const handleQuery = (q) => {
    setQuery(q);
    //搜索框输入的时候有几率出现无限循环的赋值
    /// 原因好像是Search 页面的handleQuery每次会因组件的重新渲染生成新的引用，导致SearchBox里的handleQueryDebounce也重新生成引用（debounce没有达到防抖的效果）。在两次输入时间差里handleQueryDebounce如果正好是两个不同的引用，两次输入都执行了父组件的handleQuery，然后newQuery发生改变，SearchBox里会检查到newQuery和query不同，再次触发setQuery，无限循环下去了。
    //把Search 页面的handleQuery用useCallback包起来可以解决

    if (!q) return;
    changeEnterLoadingDispatch(true);
    getSuggestListDispatch(q);
  };

  useEffect(() => {
    setShow(true);
    if (!hotList.size) getHotKeyWordsDispatch();
  }, []);

  useEffect(() => {
    setShow(true);
  }, []);

  const selectItem = () => {

  }

  const getName = () => {

  }
  const renderHotKey = () => {
    let list = hotList ? hotList.toJS() : [];
    return (
      <ul>
        {list.map((item) => {
          return (
            <li
              className="item"
              key={item.first}
              onClick={() => setQuery(item.first)}
            >
              <span>{item.first}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderSongs = () => {
    return (
      <SongItem style={{ margin: "0 20px" }} >
        {
          songsList.map(item => {
            return (
              <li key={item.id} onClick={(e) => selectItem(e, item.id)}>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    {getName(item.artists)} - {item.album.name}
                  </span>
                </div>
              </li>
            )
          })
        }
      </SongItem>
    )
  };
  const renderAlbum = () => {
    let albums = suggestList.playlists;
    if (!albums || !albums.length) return;
    return (
      <List>
        <h1 className="title"> 相关歌单 </h1>
        {albums.map((item, index) => {
          return (
            <ListItem key={item.accountId + "" + index} onClick={() => props.history.push(`/album/${item.id}`)}>
              <div
                className="img_wrapper"
              >
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require("./music.png")}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={item.coverImgUrl}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name"> 歌单: {item.name}</span>
            </ListItem>
          );
        })
        }
      </List >
    );
  };
  const renderSingers = () => { };
  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container>
        <div className="search_box_wrapper">
          <SearchBox
            back={searchBack}
            newQuery={query}
            handleQuery={handleQuery}
          ></SearchBox>
        </div>
        <ShortcutWrapper show={!query}>
          <Scroll>
            <div>
              <HotKey>
                <h1 className="title"> Hot Keys</h1>
                {renderHotKey()}
              </HotKey>
            </div>
          </Scroll>
        </ShortcutWrapper>
        <ShortcutWrapper show={query}>
          <Scroll>
            <div>
              {renderAlbum()}
              {renderSingers()}
              {renderSongs()}
            </div>
          </Scroll>
        </ShortcutWrapper>
      </Container>
    </CSSTransition>
  );
}

// 组件代码

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  hotList: state.getIn(["search", "hotList"]),
  enterLoading: state.getIn(["search", "enterLoading"]),
  suggestList: state.getIn(["search", "suggestList"]),
  songsCount: state.getIn(["player", "playList"]).size,
  songsList: state.getIn(["search", "songsList"]),
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getHotKeyWordsDispatch() {
      dispatch(getHotKeyWords());
    },
    changeEnterLoadingDispatch(data) {
      dispatch(changeEnterLoading(data));
    },
    getSuggestListDispatch(data) {
      dispatch(getSuggestList(data));
    },
  };
};
// 将 ui 组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Search));
