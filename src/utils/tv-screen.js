/**
 * Created by Zhoujianxiang on 2019-4-24.
 */

/*
 * 修改默认的HTML的rem大小，做到自适应屏幕大小
 * @param {Interge} width 屏幕尺寸
 */
function resetRem(width = 1080) {
  const html1 = document.documentElement;

  function getscreen() {
    const screenWidth = html1.clientWidth;
    html1.style.fontSize = `${(100 / width) * screenWidth}px`;
  }

  getscreen();
  window.onresize = getscreen;
}
function setViewport() {
  document.querySelector('meta[name="viewport"]').content =
    'user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width'
}

export {
  resetRem,
  setViewport
}