import * as actionTypes from "./constants";
import { fromJS } from "immutable";
import { playMode } from "../../../api/config";

const defaultState = fromJS({
  fullScreen: false,
  playing: true,
  sequencePlayList: [
    {
      ftype: 0,
      djId: 0,
      a: null,
      cd: "01",
      crbt: null,
      no: 1,
      st: 0,
      rt: "",
      cf: "",
      alia: ["手游《梦幻花园》苏州园林版推广曲"],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814,
      },
      mv: 0,
      al: {
        id: 84991301,
        name: "拾梦纪",
        picUrl:
          "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
        tns: [],
        pic_str: "109951164627180052",
        pic: 109951164627180050,
      },
      name: "拾梦纪",
      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672,
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277,
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 234947,
      ar: [
        {
          id: 12084589,
          name: "妖扬",
          tns: [],
          alias: [],
        },
        {
          id: 12578371,
          name: "金天",
          tns: [],
          alias: [],
        },
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      id: 1416767593,
      publishTime: 0,
      rurl: null,
    },
  ],
  playList: [
    {
      ftype: 0,
      djId: 0,
      a: null,
      cd: "01",
      crbt: null,
      no: 1,
      st: 0,
      rt: "",
      cf: "",
      alia: ["手游《梦幻花园》苏州园林版推广曲"],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814,
      },
      mv: 0,
      al: {
        id: 84991301,
        name: "拾梦纪",
        picUrl:
          "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
        tns: [],
        pic_str: "109951164627180052",
        pic: 109951164627180050,
      },
      name: "拾梦纪",
      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672,
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277,
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 234947,
      ar: [
        {
          id: 12084589,
          name: "妖扬",
          tns: [],
          alias: [],
        },
        {
          id: 12578371,
          name: "金天",
          tns: [],
          alias: [],
        },
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      id: 1416767593,
      publishTime: 0,
      rurl: null,
    },
  ],
  mode: playMode.sequence,
  currentIndex: -1,
  currentSong: {},
  showPlayList: false,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG:
      return state.set("currentSong", action.data);
    case actionTypes.SET_FULL_SCREEN:
      return state.set("fullScreen", action.data);
    case actionTypes.SET_PLAYING_STATE:
      return state.set("playing", action.data);
    case actionTypes.SET_SEQUECE_PLAYLIST:
      return state.set("sequencePlayList", action.data);
    case actionTypes.SET_PLAYLIST:
      return state.set("playList", action.data);
    case actionTypes.SET_PLAY_MODE:
      return state.set("mode", action.data);
    case actionTypes.SET_CURRENT_INDEX:
      return state.set("currentIndex", action.data);
    case actionTypes.SET_SHOW_PLAYLIST:
      return state.set("showPlayList", action.data);
    default:
      return state;
  }
};
