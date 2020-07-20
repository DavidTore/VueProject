/**
 * 验证工具类
 */
let validateUtil = {
  // 是否是恒大邮箱
  isWscnEmail: str => {
    let reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@evergrande\.com$/i;
    return reg.test(str.trim());
  },
  // 合法uri
  validateURL: uri => {
    let urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(uri);
  },
  // 小写字母*/
  validateLowerCase: str => {
    let reg = /^[a-z]+$/;
    return reg.test(str);
  },
  // 大写字母*/
  validateUpperCase: str => {
    let reg = /^[a-z]+$/;
    return reg.test(str);
  },
  // 大小写字母*/
  validatAlphabets: str => {
    let reg = /^[A-Za-z]+$/;
    return reg.test(str);
  },
  // 是否为空或者为null或为undefined
  isEmpty: str => {
    if (str !== null && typeof str !== 'undefined') {
      return str.replace(/(^s*)|(s*$)/g, '').length === 0;
    }
    return false;
  },
  isMobile: m => {
    return /1[2|3|4|5|6|7|8]\d{9}/.test(m);
  }
};

export default validateUtil;
