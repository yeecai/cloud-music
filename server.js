var express = require ('express')
var compression = require ('compression')
const path = require('path');

// 端口可以自己定义
var port = process.env.PORT || 3001;
var app = express ()
// 开启 gzip 压缩
app.use (compression ())
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// module.exports = app.listen (port, function (err) {
//   if (err) {
//     console.log (err)
//     return
//   }
//   console.log ('Listening at http://localhost:' + port + '\n')
// })

app.listen(port)