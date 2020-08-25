import React, { useRef, useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import style from "../../assets/global-style";
import { debounce } from "./../../api/utils";

const SearchBoxWrapper = styled.div`
  display: flex;
  background: ${style["theme-color"]};
  align-items: center;
  box-sizing: border-box;

  padding: 0 10px;
  width: 100%;
  height: 40px;
  .icon-back {
    font-size: 24px;
    color: ${style["font-color-light"]};
  }
  .box {
    flex: 1;
    display: inline-block;
    line-height: 24px;
    margin: 0 16px 0 8px;
    border: none;
    outline: none;
    background: ${style["theme-color"]};
    color: ${style["font-color-light"]};
    border-bottom: 1px solid ${style["border-color"]};
    &::placeholder {
      color: ${style["font-color-light"]};
    }
  }
  .icon-delete {
    font-size: 18px;
    color: ${style["font-color-light"]};
  }
`;
const SearchBox = (props) => {
  const queryRef = useRef();
  const [query, setQuery] = useState("");
  const { newQuery } = props;
  const { handleQuery } = props;
  const displayStyle = query ? { display: "block" } : { display: "none" };

  useEffect(() => {
    if (newQuery !== query) {
      setQuery(newQuery);
    }
  }, [newQuery]);

  useEffect(() => {
    queryRef.current.focus();
  });
  const handleChange = (event) => {
    // handleQuery()
    setQuery(event.currentTarget.value);
  };

  let handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 500);
  }, [handleQuery]);

  useEffect(() => {
      handleQueryDebounce(query)
  }, [query])
  
  const clearQuery = () => {
    setQuery("");
    queryRef.current.focus();
  };

  return (
    <SearchBoxWrapper>
      <i className="iconfont icon-back" onClick={() => props.back()}>
        &#xe655;
      </i>
      <input
        ref={queryRef}
        className="box"
        placeholder="搜索歌曲、歌手、专辑"
        value={query}
        onChange={handleChange}
      />
      <i
        className="iconfont icon-delete"
        onClick={clearQuery}
        style={displayStyle}
      >
        &#xe600;
      </i>
    </SearchBoxWrapper>
  );
};

export default SearchBox;
