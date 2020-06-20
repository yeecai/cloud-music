import style from "../../../assets/global-style";
import styled,  {keyframes} from "styled-components";

const rotate = keyframes`
    0%{
        transform: rotate(0)
    }
    100%{
        transform: rotate(360deg)
    }
`

export const MiniPlayerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: ${style ["highlight-background-color"]};
    flex: 0 0 40px;
    .icon{
        .imgWrapper{
            padding: 5px 10px;
            img{
                border-radius: 50%;

                &.play{
                    animation: ${rotate} 10s infinite;
                }
                &.pause{
                    animation-play-state: paused;
                }
            }
        }
    }
    .text{
        flex: 1;
        .name{
            font-size: ${style["font-size-m"]};
            color: ${style["font-color-desc"]};
      margin-bottom: 2px;
        }
        .desc{
            font-size: ${style["font-size-s"]};
            color: ${style["font-color-desc-v2"]};
        }
    }
    .control{
        flex: 0 0 30px;
        padding: 0 10px;
        .iconfont {
            color: ${style["theme-color"]};
            font-size: 30px;
        }
    }
`

