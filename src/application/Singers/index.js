import React, { useState } from 'react';
import Horizon from '../../baseUI/horizon-item'
import { categoryTypes, alphaTypes } from '../../api/config'
import { NavContainer } from './style'

// div width should be fixed, and 2 Horizon's width should be wider than div
function Singers(props) {
  let [category, setCategory] = useState('')
  let [alpha, setAlpha] = useState('')

  let handleUpdateCategory = (val) => {
    setCategory(val)
  }

  let handleUpdateAlpha = (val) => {
    setAlpha(val)
  }
  
  return (
    <NavContainer>
      <Horizon list={categoryTypes}
        title={"category:"}
        handleClick={handleUpdateCategory}
        oldVal={category}
        ></Horizon>
      <Horizon
        list={alphaTypes}
        title={"首字母:"}
        handleClick={val => handleUpdateAlpha(val)}
        oldVal={alpha}
        ></Horizon>
    </NavContainer>
  )
}

export default React.memo(Singers);