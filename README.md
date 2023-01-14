This is a mock music player of music.163.com, api provided by Binaryify's [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi.git)
inspired by sanyuan0704's [react-cloud-music](https://github.com/sanyuan0704/react-cloud-music.git), his react-hooks turtorial is also recommended(in Chinese) on juejin.im.  Bascially all the animation is hand-rolled, if you looking for example about CSS trasition, this project might be helpful.

### Dependencies
1. React hooks
2. Styled-component
3. Immutable.js
4. Better-scroll
5. Transition-group


### Run
1. ```npm install```
2. change baseUrl to where NeteaseCloudMusicApi is running
3. ```npm start```

### Deployment
1. ```npm run build``` 
2. ```npm install``` express, compression and pm2, then ``` node start ./server.js``` at same folder with /build
3. If path error, try remove all /cloud-music in build/index.html
4. to deploy with github-pages, run ```npm run deploy``` [react-gh-pages](https://github.com/gitname/react-gh-pages)

Note: You can ```npm start``` NeteaseCloudMusicApi at localhost or ```pm2 start npm -- start``` when deloying.

[Online](https://cloud-music-agyz.vercel.app/#/recommend)
