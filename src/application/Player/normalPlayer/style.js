import style from "../../../assets/global-style";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    0%{
        transform: rotate(0)
    }
    100%{
        transform: rotate(360deg)
    }
`;
export const NormalPlayerContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;
  background: ${style["background-color"]};
  .background {
    position: fixed;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);
  }
  &.mini-enter {
    transform: translate3d(0, 100%, 0);
  }
  &.mini-enter-active {
    transform: translate3d(0, 0, 0);
    transition: all 0.4s;
  }
  &.mini-exit {
    transform: translate3d(0, 0, 0);
  }
  &.mini-exit-active {
    transform: translate3d(0, 100%, 0);
    transition: all 0.4s;
  }
`;

export const Top = styled.div`
position: relative;
margin-bottom: 25px;
.back {
    position: absolute;
    top: 0;
    left: 6px;
    font-size: 24px;
    color: ${style["font-color-desc"]};
    font-weight: bold;
    transform: rotate(90deg);
}
.title{
    width: 70%;
    margin: 0 auto;
    line-height: 40px;
    text-align: center;
    font-size: ${style["font-size-l"]};
    color: ${style["font-color-desc"]};
    // ${style.noWrap()};
}
.subtitle{
    line-height: 20px;
    text-align: center;
    font-size: ${style["font-size-m"]};
    color: ${style["font-color-desc-v2"]};
    // ${style.noWrap()};
}
`;
export const Middle = styled.div`
  postion: fixed;
  width: 100%;
  top: 80px;
  bottom: 170px;
  white-space: nowrap;
  font-size: 0;
  overflow: hidden;
`;
export const CDWrapper = styled.div`
  width: 80%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 10%;
  height: 80vw;
  box-sizing: border-box;
  .cd {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    .image {
      left: 0;
      right: 0;
      position: absolute;
      height: 95%;
      width: 95%;
      border-sizing: border-box;
      border-radius: 50%;
      border: 10px solid rgba(255, 255, 255, 0.1);
    }
  }
`;
export const Bottom = styled.div`
  position: absolute;
  bottom: 50px;
  width: 100%;
`;
export const Operators = styled.div`
  display: flex;
  align-items: center;
  .icon {
    flex: 1;
    font-weight: 300;
    color: ${style["font-color-desc"]};
    &.disable {
      color: ${style["theme-color-shadow"]};
    }
    i {
      font-size: 30px;
    }
  }
  .i-left {
    text-align: right;
  }
  .i-center {
    padding: 0 20px;
    text-align: center;
    i {
      font-size: 40px;
    }
  }
  .i-right {
    text-align: left;
  }
`;
