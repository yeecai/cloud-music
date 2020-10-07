const extendClick = () => {
  return `
        position: relative;
        &: before {
            content: '';
            positionL absolute;
            top: -10px; bottomL -10px; left: -10px; right: -10px;
        };
    `;
};

const noWrap = () => {
  return `
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    `;
};

const bigFull = () => {
  return `
      background-position: 50%;
      background-size: contain;
      background-repeat: no-repeat;
    `;
};

export default {
  "theme-color": "#d44439",
  "theme-color-shadow": "rgba(212, 68, 57, .5)",
  "font-color-light": "#f1f1f1",
  "font-color-desc": "#2E3030",
  "font-color-desc-v2": "#bba8a8",
  "font-size-ss": "10px",
  "font-size-s": "12px",
  "font-size-m": "14px",
  "font-size-l": "16px",
  "font-size-ll": "18px",
  "border-color": "#e4e4e4",
  "background-color": "#f2f3f4",
  "background-color-shadow": "rgba(0,0,0,0.3)",
  "highlight-background-color": "#fff",
  "border-color-v2": "rgba(228, 228, 228, 0.1)",
  bigFull,
  extendClick,
  noWrap,
};
