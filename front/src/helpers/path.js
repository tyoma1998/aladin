export function getRoutePath(URL, params) {
  let parsedURL = URL;
  if (params) {
    Object.entries(params).map((value) => {
      parsedURL = parsedURL.replace(`:${value[0]}`, value[1]);
      return;
    });
  }
  return parsedURL;
}

export const removeSlashPath = (str) => {
  if (!str) return str;
  return str.replace(/^\/?|\/?$/, '');
};

export const getValidPath = (path = '') => `/${removeSlashPath(path)}`;

export const getQueryParam = (data = {}) => {
  const array = Object.entries(data);
  let res = '';
  if (array.length === 0) {
    return res;
  }

  array
    .filter((item) => {
      if (typeof item[1] === 'number') {
        return true;
      }
      return !!item[1];
    })
    .map((item, index) => {
      if (!item[0]) {
        return;
      }
      const validValue =
        typeof item[1] === 'string' ? encodeURI(item[1]) : item[1];

      res += `${index === 0 ? '?' : '&'}${item[0]}=${validValue}`;
      return;
    });

  return res;
};

export const getQueryVariable = (queryString) => {
  if (!queryString) {
    return '';
  }

  const query = {};
  const pairs = (
    queryString[0] === '?' ? queryString.substr(1) : queryString
  ).split('&');
  for (let i = 0; i < pairs.length; i += 1) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
};
