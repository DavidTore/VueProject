import accounting from 'accounting';

/**
 * 将数字 120000转换成120,000.00
 * @param {Number} number 需要转化的数字
 * @param {Number} fractionDigits 需要转化的数字位数
 * @return {String} 转换后的数字
 */
export const formatMoney = (money, precision = 2) => accounting.formatMoney(money, { symbol: '', precision });

// sessionStorage
export const sessionStorageSet = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value));
};
export const sessionStorageGet = key => JSON.parse(window.sessionStorage.getItem(key));

// localStorage
export const localStorageSet = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
export const localStorageGet = key => JSON.parse(window.localStorage.getItem(key));

/**
 * 获取cookies, 封装在一个对象中.
 * @return {object} cookie键值对
 */
export function getCookie() {
  const cookieObject = {};
  const cookies = document.cookie;
  const cookieList = cookies.split(';');
  if (cookies && cookieList) {
    cookieList.forEach(item => {
      const pair = item.split('=');
      if (pair.length > 1) {
        cookieObject[pair[0].trim()] = pair[1].trim();
      }
    });
  }
  return cookieObject;
}


/**
 * 获取user 信息
 * @return {object} 用户对象信息
 */
export function cookieUser() {
  const obj = getCookie();

  return {
    uid: obj.uid || '',
    realName: decodeURIComponent(obj.userName || ''),
    token: obj.token || '',
    companyName: decodeURIComponent(obj.companyName || ''),
    companyId: obj.companyId || '',
    departmentName: decodeURIComponent(obj.departmentName || ''),
    departmentId: obj.departmentId || '',
    pageVisual: obj.pageVisual || 0,
    smartAlias: obj.smartAlias
  };
}

export function exportFile(response) {
  console.log('exportFile', response);
  // 截取文件名，这里是后端返回了文件名+后缀，如果没有可以自己拼接
  let fileName = decodeURI(response.headers['content-disposition'].split('fileName=')[1]);
  // 将`blob`对象转化成一个可访问的`url`
  let blob = new Blob([response.data], { type: 'text/csv' });

  // 兼容IE浏览器
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fileName);
  }

  let url = window.URL.createObjectURL(blob);
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 全屏操作
export const bindScreenChange = callback => {
  document.addEventListener('fullscreenchange', callback);
  document.addEventListener('mozfullscreenchange', callback);
  document.addEventListener('webkitfullscreenchange', callback);
  document.addEventListener('msfullscreenchange', callback);
};

/**
* 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 idle，action 才会执行
* @param idle   {number}    空闲时间，单位毫秒
* @param action {function}  请求关联函数，实际应用需要调用的函数
* @return {function}    返回客户调用函数
*/
export const debounce = function(idle, action){
  var last
  return function(){
    var ctx = this, args = arguments
    clearTimeout(last)
    last = setTimeout(function(){
        action.apply(ctx, args)
    }, idle)
  }
}

export const getType = (obj) => {
  return Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1];

}