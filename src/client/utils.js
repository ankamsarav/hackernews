export default url => {
  let hostname;
  // find & remove protocol (http, ftp, etc.) and get hostname
  if (url) {
    hostname = url.indexOf('//') > -1 ? url.split('/')[2] : url.split('/')[0];
  }
  // find & remove port number
  hostname = hostname && hostname.split(':')[0];
  // find & remove "?"
  hostname = hostname && hostname.split('?')[0];

  return hostname;
};
