import styled from "styled-components";
import style from '../../assets/global-style'

export const Top = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px 10px;
    background: ${style["theme-color"]};
    &>span{
        line-height: 40px;
        color: #f1f1f1;
        font-size: 20px;
        &.iconfont {
            font-size: 25px;
        }
    }
`

export const Tab = styled.div`
    height: 44px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background: ${style["theme-color"]};
    a {
        flex: 1;
        padding: 2px 0;
        font-size:${style["font-size-m"]};
        color:${style['border-color']};
        &.selected {
            span {
                padding: 3px 0;
                font-weight:700;
                color: ${style['font-color-light']};
                border-bottom: 2px solid ${style['font-color-light']};
            }
        }
    }
`

export const TabItem = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`