import React, {
  forwardRef,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";
import styled from "styled-components";
import { prefixStyle } from './../../api/utils';
import style from '../../assets/global-style';
const Container = styled.div`
.icon_wrapper{
    position: fixed;
    z-index: 1000;
    margin-top: -10px;
    margin-left: -10px;
    color: ${style["theme-color"]};
    font-size: 14px;
    display: none;
    transition: transform 1s cubic-bezier(.62,-0.1,.86,.57);
    >div {
        transition: transform 1s;
    }
}
}`;
// transform: translate3d (0, 0, 0);

const MusicNote = forwardRef((props, ref) => {
  const iconsRef = useRef();
  const ICON_NUMBER = 3;
  const transform = prefixStyle ("transform");

  const startAnimation = ({ x, y }) => {
    for (let i = 0; i < ICON_NUMBER; i++) {
        let domArray = [].slice.call(iconsRef.current.children);
        let item = domArray[i];
      if (item.running === false) {
        item.style.left = x + "px";
        item.style.top = y + "px";
        item.style.display = "inline-block";
      }

      setTimeout(() => {
        item.running = true;
        item.style[transform] = `translate3d(0, 750px, 0)`;
        let icon = item.querySelector("div");
        icon.style[transform] = `translate3d(-40px, 0, 0)`;
      }, 0);
    }
  };

  useImperativeHandle(ref, () => ({
    startAnimation
  }))
  const createNode = (text) => {
    const template = `<div class='icon_wrapper'>${text}</div>`;
    let tempNode = document.createElement("div");
    tempNode.innerHTML = template;
    return tempNode.firstChild;
  };
  useEffect(() => {
    for (let i = 0; i < ICON_NUMBER; i++) {
      let node = createNode(`<div class="iconfont">&#xe642;</div>`);
      iconsRef.current.appendChild(node);
    }

    // let domArray = [...iconsRef.current.children];
    // let domArray = Array.from(iconsRef.current.children)
    let domArray = [].slice.call(iconsRef.current.children);
    domArray.forEach((item) => {
      item.running = false;
      item.addEventListener(
        "transitionend",
        function () {
          this.style["display"] = "none";
          this.style[transform] = `translate3d(0,0,0)`;
          this.running = false;

          let icon = this.querySelector("div");
          icon.style[transform] = `translate3d(0, 0, 0)`;
        },
        false
      );
    });
  }, []);
  return <Container ref={iconsRef}></Container>;
});

export default MusicNote;
