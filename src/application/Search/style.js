import styled from "styled-components";
import style from "../../assets/global-style";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;
  &.fly-enter,
  &.fly-appear {
    transform: translate3d (100%, 0, 0);
  }
  &.fly-enter-active,
  &.fly-appear-active {
    transition: all 0.3s;
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: all 0.3s;
    transform: translate3d(100%, 0, 0);
  }
`;

export const ShortcutWrapper = styled.div`
  // position: absolute;
  // top: 40px;
  display: ${(props) => (props.show ? "" : "none")};
`;

export const HotKey = styled.div`
  margin: 0 20px;
  .title {
    padding: 35px 0 25px 0;
    font-size: ${style["font-size-m"]};
    color: ${style["font-color-desc-v2"]};
  }

  .item {
    display: inline-block;
    border-radius: 6px;
    padding: 15px 10px;
    alight-items: center;
    margin: 0 10px 10px 0px;
    border-radius: 6px;
    background: ${style["highlight-background-color"]};
    font-size: ${style["font-size-m"]};
  }
`;

export const List = styled.div``
export const ListItem = styled.div``

