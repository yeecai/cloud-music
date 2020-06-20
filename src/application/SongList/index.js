import React from "react";
import { SongList, SongItem } from "./style";
import { getName } from "../../api/utils";

const SongsList = React.forwardRef((props, refs) => {
  const { savedCount, songs, showSaved } = props;
  const selectItem = (e, index) => {
    console.log(index);
  };

  let savedBy = (savedCount) => {
    return (
      <div className="save">
        <span>
          <i className="iconfont">&#xe62d;</i>
          Saved({Math.floor(savedCount / 1000) / 10}w)
        </span>
      </div>
    );
  };
  let songList = (list) => {
    let res = list.map((item, index) => {
      return (
        <li key={index} onClick={(e) => selectItem(e, index)}>
          <span className="index">{index + 1}</span>
          <div className="info">
            <span>{item.name}</span>
            <span>
              {item.ar ? getName(item.ar) : getName(item.artists)} -{" "}
              {item.al ? item.al.name : item.album.name}
            </span>
          </div>
        </li>
      );
    });
    return res;
  };

  return (
    <SongList ref={refs}>
      <div className="songlist_top">
        <div className="play_all">
          <i className="iconfont">&#xe6e3;</i>
          Play all<span>({songs.length} in total)</span>
        </div>
        {showSaved ? savedBy(savedCount) : null}
      </div>
      <SongItem>{songList(songs)}</SongItem>
    </SongList>
  );
});

export default React.memo(SongsList);
