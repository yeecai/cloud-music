import styled from "styled-components";
import style from "../../assets/global-style";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: £fff;
  transform-origin: right bottom;
  &.fly-enter,
  &.fly-appear {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active,
  &.fly-appear-active {
    transition: transform 0.3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform 0.3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`;

export const TopDesc = styled.div`
  background-size: 100%;
  height: 275px;
  display: flex;
  align-items: center;
  padding: 5px 20px;
  justify-content: space-around;
  padding-bottom: 20px;
  marigin-bottom: 20px;
  position: relative;
  .background {
    z-index: -1;
    background: url(${(props) => props.background}) no-repeat;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-position: 0 0;
    position: absolute;
    filter: blur(20px);
    .filter {
      position: absolute;
      z-index: 10;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.2);
    }
  }
  .img_wrapper_left {
    width: 120px;
    height: 120px;
    position: relative;
    img {
      width: 120px;
      height: 120px;
      border-radius: 3px;
    }
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0, 0%, 43%, 0.4), hsla(0, 0%, 100%, 0));
    }
    .play_amount {
      right: 2px;
      top: 2px;
      position: absolute;
      font-size: ${style["font-size-s"]};
      line-height: 15px;
      color: ${style["font-color-light"]};
      .play {
        vertical-align: top;
      }
    }
  }
  .desc_wrapper_right {
    display: flex;
    flex-direction: column;
    height: 120px;
    padding: 0 10px;
    .title {
      color: ${style["font-color-light"]};
      font-size: ${style["font-size-l"]};
      max-height: 70px;
      line-height: 1.5;
      padding: 10px 0;
    }
    .author {
      display: flex;
      .avatar {
        margin-right: 5px;
      }
      .name {
        line-height: 20px;
        font-size: ${style["font-size-m"]};
        color: ${style["font-color-desc-v2"]};
      }
    }
    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }
`;
export const Menu = styled.div`
// position: relative;
  display: flex;
    justify-content: space-between;
    margin-top: -100px;
    padding: 20px 30px;

`;
export const SongList = styled.div``;
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
