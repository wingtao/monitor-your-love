const crypto = require('crypto');
const request = require('request');
const querystring = require('querystring');
const smsTemplate = require('./utils').smsTemplate;

/**
 * @user
 * @password
 * @content
 * @phone
 */

class SMS {
  constructor(options = {}) {
    this.user = options.user;
    this.phone = options.phone;
    this.content = options.content;
    this.password = options.password;
    this.url = options.url;
    this.price = options.price;
    this.smsapi = "http://api.smsbao.com";
    this.init();
  }

  init() {
    const md5 = crypto.createHash('md5');
    const pass = md5.update(this.password).digest('hex');
    this.data = {
      'u': this.user,
      'p': pass,
      'm': this.phone,
      'c': smsTemplate({ price: this.price, url: this.url }),
    };
  }

  send() {
    const options = {
      hostname: this.smsapi,
      path: '/sms?' + querystring.stringify(this.data),
      method: 'GET'
    };
    request(options.hostname + options.path, (error, response, body) => {
      if (error) {
        console.error('发送短信失败', error);
      }
      this.statusHandler(body);
    })
  }

  statusHandler(status) {
    switch (status) {
      case '0':
        console.log('短信发送成功');
        break;
      case '-1':
        console.log('参数不全');
        break;
      case '-2':
        console.log('服务器空间不支持,请确认支持curl或者fsocket，联系您的空间商解决或者更换空间！');
        break;
      case '30':
        console.log('密码错误');
        break;
      case '40':
        console.log('账户不存在');
        break;
      case '41':
        console.log('余额不足');
        break;
      case '42':
        console.log('账户已过期');
        break;
      case '43':
        console.log('IP地址限制');
        break;
      case '50':
        console.log('内容含有敏感字');
        break
    }
  }
}

module.exports = SMS;
