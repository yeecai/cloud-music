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

export const List = styled.div`
    display: flex;
    margin: auto;
    flex-direction: column;
    overflow: hidden;
    .title {
      margin: 10px;
      color: ${style["font-color-desc"]};
      font-size: ${style["font-size-s"]};
    }
`
export const ListItem = styled.div`
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    margin: 5px;
    align-items: center;
    border-bottom: 1px solid ${style["border-color"]};
    .img_wrapper {
      margin: 0 20px;
      img {
        border-radius: 6px;
        width: 50px;
        height: 50px;
      }
    }
    .name {
      font-size: ${style["font-size-m"]};
      color: ${style["font-color-desc"]};
      font-weight: 500;
    }
`
export const SongItem = styled.ul`
// margin: 5px 10px 5px 0px;
    li {
      display: flex;
      height: 60px;
      align-item: center;
      .index {
        width: 60px;
      }
      .info{
        flex-direction: column;
        display: flex;
        flex: 1;
        height: 100%;
        margin: 5px 10px 5px 0px;
        justify-content: space-around;
        border-bottom: 1px solid ${style["border-color"]};
        span: last-child{
          font-size: ${style["font-size-s"]};
          color: #bba8a8;
        }
      }
    }

`
