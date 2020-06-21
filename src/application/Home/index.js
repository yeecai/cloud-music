import React from 'react';
import { renderRoutes } from 'react-router-config'
import { useTranslation, Trans, withTranslation } from "react-i18next";
import Player from '../Player'
import {
  Top,
  Tab,
  TabItem
} from "./style";
import { NavLink } from "react-router-dom";

function Home(props) {
  const { route } = props
  const { t, i18n } = useTranslation('translation');
  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
  return (
    <div>
      <Top>
        <span className="iconfont menu">menu</span>
        {/* deal the fonts later tgt */}
        <span className="title">{t('title')}</span>
        <span className="iconfont search">   &#xe637;
           {/* <i className="iconfont">&#xe637;</i> */}
        </span>
      </Top>
      {/* <Player/> */}
      <Tab>
        <NavLink to="/recommend" activeClassName="selected"><TabItem><span>{t('1')}</span></TabItem></NavLink>
        <NavLink to="/singers" activeClassName="selected"><TabItem><span>{t('2')}</span></TabItem></NavLink>
        <NavLink to="/rank" activeClassName="selected"><TabItem><span>{t('3')}</span></TabItem></NavLink>
      </Tab>

      {/* <button onClick={() => changeLanguage('zh')}>zh</button>
      <button onClick={() => changeLanguage('en')}>en</button> */}

      {/* <div>{t('description.part1')}</div>  its not working = =! */}

      {renderRoutes(route.routes)}
    </div>
  )
}

export default React.memo(withTranslation('common')(Home));
