import React, { useState } from "react";
import { Container } from "./style";
import { CSSTransition } from "react-transition-group";
import Header from "./../../baseUI/header/index";
import Scroll from "../../baseUI/scroll";
import { getName } from "../../api/utils";
import { TopDesc, Menu, SongItem, SongList } from "./style";

function Album(props) {
  const [showStatus, setShowStatus] = useState(true);

  const handleBack = () => {
    setShowStatus(false);
  };

  //mock 数据
  const currentAlbum = {
    author: {
      avatarUrl:
        "http://p1.music.126.net/O9zV6jeawR43pfiK2JaVSw==/109951164232128905.jpg",
      username: "浪里推舟",
    },
    coverImgUrl:
      "http://p2.music.126.net/ecpXnH13-0QWpWQmqlR0gw==/109951164354856816.jpg",
    subscribedCount: 2010711,
    name: "听完就睡，耳机是天黑以后柔软的梦境",
    tracks: [
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
    ],
  };
  const renderSongList = () => {
    return (
      <SongList>
        <div className="songlist_top">
          <div className="play_all">
            <i className="iconfont">&#xe6e3;</i>
            Play all<span>({currentAlbum.tracks.length} in total)</span>
          </div>
          <div className="save">
            <span>
              {" "}
              <i className="iconfont">&#xe62d;</i>
              Save(29K)
            </span>
          </div>
        </div>
        <SongItem>
          {currentAlbum.tracks.map((item, index) => {
            return (
              <li key={index}>
                <span className="index">{index + 1}</span>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    {getName(item.ar)} - {item.al.name}
                  </span>
                </div>
              </li>
            );
          })}
        </SongItem>
      </SongList>
    );
  };
  return (
    // <div>test</div>
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container>
        <Header title="back" handleClick={handleBack}></Header>
        <Scroll>
          <TopDesc background={currentAlbum.coverImgUrl}>
            <div className="background">
              <div className="filter"></div>
            </div>
            <div className="img_wrapper_left">
              <div className="decorate"></div>
              <img src={currentAlbum.coverImgUrl} alt="" />
              <div className="play_amount">
                <i className="iconfont play">&#xe885;</i>
                {/* TODO: headphone icon */}
                <span className="amount">{`${Math.floor(
                  currentAlbum.subscribedCount / 1000
                )}W`}</span>
              </div>
            </div>
            <div className="desc_wrapper_right">
              <div className="title">{currentAlbum.name}</div>
              <div className="author">
                <div className="avatar">
                  <img src={currentAlbum.author.avatarUrl} alt="" />
                </div>
                <div className="name">{currentAlbum.author.username}</div>
              </div>
            </div>
          </TopDesc>
          <Menu>
            <div>
              <i className="iconfont">&#xe6ad;</i>
              Comment
            </div>
            <div>
              <i className="iconfont">&#xe86f;</i>
              Like
            </div>
            <div>
              <i className="iconfont">&#xe62d;</i>
              Save
            </div>
            <div>
              <i className="iconfont">&#xe606;</i>
              More
            </div>
          </Menu>
          {renderSongList()}
        </Scroll>
      </Container>
    </CSSTransition>
  );
}

export default Album;
