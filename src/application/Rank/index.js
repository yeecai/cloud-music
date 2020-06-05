import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getRankList } from './store';

function Rank(props) {

    const { rankList: list, loading } = props
    const { getRankListDataDispatch } = props

    let rankList = list ? list.toJS() : []

    useEffect(() => {
        if (!rankList.length) {
            getRankListDataDispatch()
        }
    }, [])

    let globalStartIndex = filterIndex(rankList)
    let officialList = rankList.slice(0, globalStartIndex)
    let globalList = rankList.slice(globalStartIndex)

    const enterDetail = (name) => {
        const idx = filterIdx(name)
        if (idx === null) {
            alert('no data found')
            return
        }
    }

    const renderSongList = (list) => {
        return list.length ? (
            <SongList>
                {
                    list.map((item, index) => {
                        return <li key={index}>{index + 1}. {item.first} - {item.second}</li>
                    })
                }
            </SongList>
        ) : null
    }

    const renderRankList = (list, global) => {
        return (
            <List globalRank={global}>
                {
                    list.map((item) => {
                        return (
                            <ListItem key={item.coverImgId} tracks={item.tracks} onClick={() => enterDetail(item.name)}>
                                <div>
                                    <img src={img.coverImgUrl} alt=""/>
                                </div>
                                {renderSongList(item.tracks)}
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }
}
return (
    <div>Rank</div>
)
}

const mapStateToProps = (state) = ({
    rankList: state.getIn(['rank', 'rankList']),
    loading: state.getIn(['rank', 'loading'])
})

const mapDispatchToProps = (dispatch) => {
    return {
        getRankListDataDispatch() {
            dispatch(getRankList())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));