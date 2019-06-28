const isHtml = (html)=> html && ~html.indexOf('<!DOCTYPE HTML>');

//短信模板
// todo 增加商品名称
const smsTemplate = ({price, url}) => `【monitor-your-love】客官，你朝思暮想的宝贝已经降价到${price}啦，快去看看吧~点击${url}即可跳转`;

// 2019/06/02 12:23
const formatTime = (date) => `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`

module.exports = {
  isHtml,
  smsTemplate,
  formatTime,
};

