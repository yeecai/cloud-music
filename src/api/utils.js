import { Link } from "react-router-dom";

export const getCount = (count) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + "万";
  } else {
    return Math.floor(count / 1000000) / 10 + "亿";
  }
  //TODO: i18 this part!
};

export const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this.args);
      clearTimeout(timer);
    }, delay);
  };
};

export const findGlobal = (rankList) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};

// TODO try join
export const getName = (list) => {
  let str = "";
  list.map((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
  });
  return str;
};

export const getNameByJoin = (list) => {
  return list.map((a) => a.name).join("/");
};
export const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0;

let elementStyle = document.createElement("div").style;

let vendor = (() => {
  // Which broswer
  let transformNames = {
    webkit: "webkitTransform",
    Moz: "MozTransform",
    O: "OTransfrom",
    ms: "msTransform",
    standard: "Transform",
  };
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }
  if (vendor === "standard") {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

export const getSongUrl = (id) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};
export const formatPlayTime = (interval) => {
  interval = interval | 0; // get rid of .xxxx
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
};

export const findIndex = (song, list) => {
  return list.findIndex((item) => {
    return item.id === song.id;
  });
};
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function shuffle(arr) {
  let new_arr = [];
  arr.forEach((item) => {
    new_arr.push(item);
  });

  return arr.map((item, index) => {
    let tIndex = getRandomInt(0, index);
    let temp = new_arr[tIndex];
    new_arr[tIndex] = item;
    return item = temp;
  });
}
