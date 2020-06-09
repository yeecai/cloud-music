import React, { useState } from "react";
import { Container } from "./style";
import { CSSTransition } from "react-transition-group";
import Header from "./../../baseUI/header/index";
import Scroll from "../../baseUI/scroll";

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
          <TopDesc>
            <div className="background">
              <div className="filter"></div>
            </div>
            <div className="img_wrapper_left">
              <img src={currentAlbum.coverImgUrl} alt="" />
              <div className="play_amount">
                <i></i>
                {/* TODO: headphone icon */}
                <span className="amount">{`${Math.floor(
                  currentAlbum.subscribedCount / 1000
                )}+'0,'+'000'`}</span>
              </div>
            </div>
            <div className="desc_wrapper_right">
              <div className="title"></div>
              <div className="author">
                <div className="avatar">
                  <img src={currentAlbum.author.avatarUrl} alt="" />
                </div>
                <div className="name">{currentAlbum.author.username}</div>
              </div>
            </div>
          </TopDesc>
          <Menu>
            <div>Comment</div>
            <div>Like</div>
            <div>Save</div>
            <div>More</div>
          </Menu>
        </Scroll>
        <SongList>
            <div className="songlist_top"></div>
          <SongItem>
              {
                  currentAlbum.tracks.map((item, index) => {
                      return (
                          <li key={index}>
                              <span></span>
                          </li>
                      )
                  })
              }
          </SongItem>
        </SongList>
      </Container>
    </CSSTransition>
  );
}

export default Album;
