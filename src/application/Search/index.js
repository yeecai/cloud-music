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
  const [query, setQuery] = useState("");

  const searchBack = useCallback(() => {
    setShow(false);
  }, []);

  const handleQuery = (q) => {
    setQuery(q);
    //搜索框输入的时候有几率出现无限循环的赋值
    /// 原因好像是Search 页面的handleQuery每次会因组件的重新渲染生成新的引用，导致SearchBox里的handleQueryDebounce也重新生成引用（debounce没有达到防抖的效果）。在两次输入时间差里handleQueryDebounce如果正好是两个不同的引用，两次输入都执行了父组件的handleQuery，然后newQuery发生改变，SearchBox里会检查到newQuery和query不同，再次触发setQuery，无限循环下去了。
    //把Search 页面的handleQuery用useCallback包起来可以解决
  };

  useEffect(() => {
    setShow(true);
    if (!hotList.size) getHotKeyWordsDispatch();
  }, []);

  useEffect(() => {
    setShow(true);
  }, []);
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
