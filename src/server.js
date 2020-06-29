var express = require ('express')
var compression = require ('compression')
// 端口可以自己定义
var port = process.env.PORT || 8010;
var app = express ()
// 开启 gzip 压缩
app.use (compression ())
app.use (express.static ('./build'))
module.exports = app.listen (port, function (err) {
  if (err) {
    console.log (err)
    return
  }
  console.log ('Listening at http://localhost:' + port + '\n')
})