import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState, useMemo } from 'react'
import BScroll from "better-scroll"
import PropTypes from "prop-types"
import styled from 'styled-components'
import Loading from '../loading'
import LoadingV2 from '../loading-v2'
import { debounce } from '../../api/utils'


const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const PullupLoading = styled.div`
  position: absolute;
  left:0; right:0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

const PulldownLoading = styled.div`
  position: absolute;
  left:0; right:0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`;

const Scroll = forwardRef((props, ref) => {
    const scrollContaninerRef = useRef();

    const { direction, click, refresh, bounceTop, bounceBottom } = props;
    const { pullUp, pullDown, onScroll, pullupLoading, pulldownLoading } = props;

    const [bScroll, setBScroll] = useState();

    let pullUpDebounce = useMemo(() => {
        return debounce(pullUp, 300)
    }, [pullUp])

    let pullDownDebounce = useMemo(() => {
        return debounce(pullDown, 300)
    }, [pullDown])

    useEffect(() => {
        const scroll = new BScroll(scrollContaninerRef.current, {
            scrollX: direction === 'horizontal',
            scrollY: direction === 'vertical',
            propeType: 3,
            click: click,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom
            }
        });

        setBScroll(scroll);
        return () => {
            setBScroll(null)
        }
    }, [])


    useEffect(() => {
        if (!bScroll || !onScroll) return;
        bScroll.on('scroll', (scroll) => {
            onScroll(scroll);
            // alert('on')
        })
        return () => {
            bScroll.off('scroll')
        }
    }, [onScroll, bScroll])

    useEffect(() => {
        if (!bScroll || !pullUp) return;
        bScroll.on('scrollEnd', () => {
            if (bScroll.y <= bScroll.maxScrollY + 100) {
                pullUp();
            }
        })
        return () => {
            bScroll.off('scrollEnd')
        }
    }, [pullUp, pullUpDebounce, bScroll])

    useEffect(() => {
        if (!bScroll || !pullDown) return;
        bScroll.on('touchEnd', (pos) => {
            if (pos.y > 50) {
                pullDown()
            }
        })

        return () => {
            bScroll.off('touchEnd')
        }
    }, [pullDown, pullDownDebounce, bScroll])

    useEffect(() => {
        if (refresh && bScroll) {
            bScroll.refresh();
        }
    });

    useImperativeHandle(ref, () => ({
        refresh() {
            if (bScroll) {
                bScroll.refresh();
                bScroll.scrollTo(0, 0);
            }
        },
        getBScroll() {
            if (bScroll) {
                return bScroll;
            }
        }
    }));

    const PullupDisplayStyle = pullupLoading ? { display: "" } : { display: "" }
    const PulldownDisplayStyle = pulldownLoading ? { display: "" } : { display: "" }
    return (
        <ScrollContainer ref={scrollContaninerRef}>
            {props.children}
            {/* <PullupLoading style={PullupDisplayStyle}><Loading></Loading></PullupLoading> */}
            {/* <PulldownLoading style={PulldownDisplayStyle}><LoadingV2></LoadingV2></PulldownLoading> */}
        </ScrollContainer>
    )
})

Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll: null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true
};

Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizontal']),// 滚动的方向
    click: PropTypes.bool,
    refresh: PropTypes.bool,// 是否刷新
    onScroll: PropTypes.func,// 滑动触发的回调函数
    pullUp: PropTypes.func,// 上拉加载逻辑
    pullDown: PropTypes.func,// 下拉加载逻辑
    pullUpLoading: PropTypes.bool,// 是否显示上拉 loading 动画
    pullDownLoading: PropTypes.bool,// 是否显示下拉 loading 动画
    bounceTop: PropTypes.bool,// 是否支持向上吸顶
    bounceBottom: PropTypes.bool// 是否支持向下吸底
};



export default Scroll