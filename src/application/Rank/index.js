import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRankList } from "./store";
import { findGlobal } from "../../api/utils";
import { renderRoutes } from "react-router-config";

function Rank(props) {
  const { rankList: list, loading } = props;
  const { getRankListDataDispatch } = props;

  let rankList = list ? list.toJS() : [];

  useEffect(() => {
    if (!rankList.length) {
      getRankListDataDispatch();
    }
  }, []);

  let globalStartIndex = findGlobal(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);

  const enterDetail = (name) => {
    const idx = filterIdx(name);
    if (idx === null) {
      alert("no data found");
      return;
    }
  };

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} x {item.second}
            </li>
          );
          // seriously?? index as key???
        })}
      </SongList>
    ) : null;
  };

  //global as a flag
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {list.map((item) => {
          return (
            <ListItem
              key={item.coverImgId}
              tracks={item.tracks}
              onClick={() => enterDetail(item.name)}
            >
              <div>
                <img src={img.coverImgUrl} alt="" />
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          );
        })}
      </List>
    );
  };

  let displayStyle = loading ? { display: "none" } : { display: "" };

  return (
    <Container>
      <Scroll>
        <div>
          <h1>offical</h1>
          {renderRankList(officialList)}
          <h1>global</h1>
          {renderRankList(globalList, true)}
          {loading ? <EnterLoading><Loading></Loading></EnterLoading>:null}
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  );
}

const mapStateToProps = (state = {
  rankList: state.getIn(["rank", "rankList"]),
  loading: state.getIn(["rank", "loading"]),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch() {
      dispatch(getRankList());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));
