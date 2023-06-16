export const CN_REG = new RegExp("[\u4E00-\u9FA5]+");
export const LETTER_WIDTH_CONF = {
  " ": 0.3329986572265625,
  a: 0.5589996337890625,
  A: 0.6569992065429687,
  b: 0.58599853515625,
  B: 0.6769989013671875,
  c: 0.5469985961914062,
  C: 0.7279998779296875,
  d: 0.58599853515625,
  D: 0.705999755859375,
  e: 0.554998779296875,
  E: 0.63699951171875,
  f: 0.37299957275390627,
  F: 0.5769989013671875,
  g: 0.5909988403320312,
  G: 0.7479995727539063,
  h: 0.555999755859375,
  H: 0.7199996948242188,
  i: 0.255999755859375,
  I: 0.23699951171875,
  j: 0.26699981689453123,
  J: 0.5169998168945312,
  k: 0.5289993286132812,
  K: 0.6899993896484375,
  l: 0.23499908447265624,
  L: 0.5879989624023437,
  m: 0.854998779296875,
  M: 0.8819992065429687,
  n: 0.5589996337890625,
  N: 0.7189987182617188,
  o: 0.58599853515625,
  O: 0.7669998168945312,
  p: 0.58599853515625,
  P: 0.6419998168945312,
  q: 0.58599853515625,
  Q: 0.7669998168945312,
  r: 0.3649993896484375,
  R: 0.6759994506835938,
  s: 0.504998779296875,
  S: 0.6319992065429687,
  t: 0.354998779296875,
  T: 0.6189987182617187,
  u: 0.5599990844726562,
  U: 0.7139999389648437,
  v: 0.48199920654296874,
  V: 0.6389999389648438,
  w: 0.754998779296875,
  W: 0.929998779296875,
  x: 0.5089996337890625,
  X: 0.63699951171875,
  y: 0.4959991455078125,
  Y: 0.66199951171875,
  z: 0.48699951171875,
  Z: 0.6239990234375,
  0: 0.6,
  1: 0.40099945068359377,
  2: 0.6,
  3: 0.6,
  4: 0.6,
  5: 0.6,
  6: 0.6,
  7: 0.5469985961914062,
  8: 0.6,
  9: 0.6,
  "[": 0.3329986572265625,
  "]": 0.3329986572265625,
  ",": 0.26399993896484375,
  ".": 0.26399993896484375,
  ";": 0.26399993896484375,
  ":": 0.26399993896484375,
  "{": 0.3329986572265625,
  "}": 0.3329986572265625,
  "\\": 0.5,
  "|": 0.19499969482421875,
  "=": 0.604998779296875,
  "+": 0.604998779296875,
  "-": 0.604998779296875,
  _: 0.5,
  "`": 0.3329986572265625,
  "~": 0.8329986572265625,
  "!": 0.3329986572265625,
  "@": 0.8579986572265625,
  "#": 0.6,
  $: 0.6,
  "%": 0.9699996948242188,
  "^": 0.517999267578125,
  "&": 0.7259994506835937,
  "*": 0.505999755859375,
  "(": 0.3329986572265625,
  ")": 0.3329986572265625,
  "<": 0.604998779296875,
  ">": 0.604998779296875,
  "/": 0.5,
  "?": 0.53699951171875,
};

/**
 *
 * @param letter the letter
 * @param fontSize
 * @return the letter's width
 */
export const getCharWidth = (letter, fontSize) => {
  return fontSize * (LETTER_WIDTH_CONF[letter] || 1);
};
/**
 *
 * @param text the text
 * @param fontSize
 * @return the text's size
 */
export const getTextWidth = (text, fontSize) => {
  let width = 0;
  text.split("").forEach((letter) => {
    if (CN_REG.test(letter)) {
      // 中文字符
      width += fontSize;
    } else {
      width += getCharWidth(letter, fontSize);
    }
  });
  return width;
};
const TEXT_WIDTH_HELPER_CLASS_NAME = "__TEXT_WIDTH_HELPER_ELE__";
// 通过隐藏的元素获取文本宽度
export const getTextWidth2 = (text, fontSize) => {
  if (!document || !document.querySelector) {
    return getTextWidth(text, fontSize);
  }
  let ele = document.querySelector(`.${TEXT_WIDTH_HELPER_CLASS_NAME}`);
  if (!ele) {
    ele = document.createElement("span");
    ele.className = TEXT_WIDTH_HELPER_CLASS_NAME;
    ele.style.position = "absolute";
    ele.style.bottom = "0";
    ele.style.left = "0";
    ele.style.zIndex = "-9999";
    ele.style.visibility = "hidden";
    ele.style.fontSize = fontSize;
  }
  ele.innerHTML = text;
  document.body.appendChild(ele);
  return ele.clientWidth;
};
