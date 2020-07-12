import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRankList } from "./store";
import { findGlobal } from "../../api/utils";
import { renderRoutes } from "react-router-config";
import { SongList, List, ListItem, Container } from "./style.js";
import Scroll from "../../baseUI/scroll/index";
import Loading from "../../baseUI/loading";

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

  const enterDetail = (item) => {
    props.history.push(`/rank/${item.id}`);
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
              onClick={() => enterDetail(item)}
            >
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <span className="update-frequency">{item.updateFrequency}</span>
                <div className="decorate"></div>
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
    <Container songcount={1}>
      <Scroll>
      <div>
        <h1 className="offical" style={displayStyle}>
          Offical Rank
        </h1>
        {renderRankList(officialList)}
        <h1 className="global" style={displayStyle}>
          Global Rank
        </h1>
        {renderRankList(globalList, true)}
        {loading ? <Loading></Loading> : null}
        {/* TODO: <EnterLoading></EnterLoading> */}
      </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  );
}

const mapStateToProps = (state) => ({
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
