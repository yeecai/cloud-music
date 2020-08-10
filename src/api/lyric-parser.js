// match timeStamp like [00:01.997]
// ps: the currentLine here actually the next line we about to move on
// but this.lines[currentLine - 1] actually the line playing
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;

const STATE_PAUSE = 0;
const STATE_PLAYING = 1;

export default class Lyric {
  constructor(lrc, handler = () => {}) {
    this.lrc = lrc;
    this.handler = handler;
    this.lines = [];
    this.state = STATE_PAUSE;
    this.currentLine = 0;
    this.startStamp = 0;

    this._initLines();
  }

  _initLines() {
    const lines = this.lrc.split("\n");
    lines.forEach((line) => {
      let result = timeExp.exec(line);
      if (!result) return;
      const txt = line.replace(timeExp, "").trim();
      if (txt) {
        if (result[3].length === 3) {
          result[3] = result[3] / 10;
        }
        this.lines.push({
          time:
            result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10,
          txt,
        });
      }
    });
    this.lines.sort((a, b) => {
      return a.time - b.time;
    });
  }

  play(offset = 0, isSeek = false) {
    if (!this.lines.length) return;
    this.state = STATE_PLAYING;
    this.currentLine = this._findCurrentLine(offset);
    this._callHandler(this.currentLine - 1);
    this.startStamp = +new Date() - offset; // probably now
    if (this.currentLine < this.lines.length) {
      clearTimeout(this.timer);
      this._playReset(isSeek);
    }
  }

  _findCurrentLine(time) {
    this.lines.forEach((item, index) => {
      if (time <= item.time) {
        return index;
      }
    });
    return this.lines.length - 1;
  }

  _callHandler(i) {
    if (i < 0) return;
    this.handler({
      txt: this.lines[i].txt,
      lineNum: i,
    });
  }

  _playReset(isSeek = false) {
    let line = this.lines[this.currentLine];
    let delay;
    if (isSeek) {
      // if the use dragged the scrollbar/timeline, which means the HEAD might be somewhere between two lines
      // the delay depends on now and when we started
      delay = line.time - (+new Date() - this.startStamp);
    } else {
      // if user didn't drag
      // the delay depends on next line - the currentline
      let preTime = this.lines[this.currentLine - 1]
        ? this.lines[this.currentLine - 1].time
        : 0;
      delay = line.time - preTime;
    }
    this.timer = setTimeout(() => {
      this._callHandler(this.currentLine++);
      if (
        this.currentLine < this.lines.length &&
        this.state === STATE_PLAYING
      ) {
        this._playReset();
      }
    }, delay);
  }

  togglePlay(offset) {
    if (this.state === STATE_PLAYING) {
      this.stop();
    } else {
      this.state = STATE_PLAYING;
      this.play(offset, true);
    }
  }

  stop() {
    this.state = STATE_PAUSE;
    clearTimeout(this.timer);
  }

  seek(offset) {
    this.play(offset, true);
  }
}
