import styled from "styled-components";
import style from "../../assets/global-style";

export const SongList = styled.div`
  background: ${style["highlight-background-color"]};
  opacity: 0.98;
  border-radius: 10px;
  line-height: 24px;
  .songlist_top {
    line-height: 40px;
    box-sizing: border-box;
    display: flex;
    // padding: 10px 0;
    margin: 0;
    position: relative;
    border-bottom: 1px solid ${style["border-color"]};
    justify-content: space-between;
    .play_all {
      flex: 3;
      align-items: center;
      display: flex;
      justify-content: center;
    }

    .save {
      border-radius: 10px;
      flex: 2;
      background: ${style["theme-color"]};
      color: ${style["font-color-light"]};
      display: flex;
      font-size: 0;
      line-height: 34px;
      justify-content: center;
      > span {
        font-size: 14px;
        vertical-align: top;
      }
    }s
  }
`;

export const SongItem = styled.ul`
  > li {
    display: flex;
    .index {
      flex-basis: 60px;
      text-align: center;
    }
    .info {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 5px 0;
      ${style.noWrap()}
      justify-content: space-around;
      border-bottom: 1px solid ${style["border-color"]};
      > span {
        ${style.noWrap()}
      }
      > span:first-child {
        color: ${style["font-color-desc"]};
      }
      > span:last-child {
        font-size: ${style["font-size-s"]};
        color: #bba8a8;
      }
    }
  }
`;