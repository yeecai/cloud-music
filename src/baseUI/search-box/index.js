import React, { useRef, useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import style from '../../assets/global-style';
import { debounce } from './../../api/utils';

const SearchBoxWrapper = styled.div`
    display: flex
    .icon-back{

    }
    .box{
        flex : 1
    }
    .icon-delete{

    }
`
const SearchBox = (props) => {
    const queryRef = useRef();
    const [query, setQuery] = useState('');
    const { newQuery } = props;
    const { handleQuery } = props;
    const displayStyle = query ? { display: 'block' } : { display: 'none' };

    useEffect(() => {
        if (newQuery !== query) {
            setQuery(newQuery)
        }
    }, [newQuery])

    useEffect(() => {
        queryRef.current.focus()
    })
    const handleChange = () => {
    };
    const clearQuery = () => {
        setQuery('')
        queryRef.current.focus()
    }

    return (
        <SearchBoxWrapper>
            <i className="iconfont icon-back" onClick={() => props.back()}>&#xe655;</i>
            <input ref={queryRef} className="box" placeholder="搜索歌曲、歌手、专辑" value={query} onChange={handleChange} />
            <i className="iconfont icon-delete" onClick={clearQuery} style={displayStyle}>&#xe600;</i>
        </SearchBoxWrapper>
    )
};

export default SearchBox