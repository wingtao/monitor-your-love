const cheerio = require('cheerio');
const request = require('request');
const invariant = require('invariant');
const isHtml = require('./utils').isHtml;
const formatTime = require('./utils').formatTime;
const SMS = require('./SMS');

/**
 * @url
 * @target
 */

class Monitor {
  constructor(url, target) {
    this.oriURL = url;
    this.target = target;
    this.html = '';
    const skuId = this.oriURL.match(/\/\d+\./)[0].slice(1, -1);
    this.url = `https://p.3.cn/prices/mgets?skuIds=J_${skuId}`;
    this.init();
  }

  init() {
    invariant(this.oriURL, 'there must have an param with url');
    invariant(this.target, 'there must have an param with target');
    this.fetchData();
  }

  parseHtml() {
    // const $ = cheerio.load(this.html);
    // const price = $('.J-p-5046941').map(item=>console.log(item));
    //   var $ = cheerio.load('<h2><div class="title">Hello world</div></h2>');

    // console.log($('h2 .title').text(),'sss');
  }

  fetchData() {
    request(this.url, (error, response, body) => {
      if (error) {
        console.error('获取数据错误: ', error);
      } else {
        if (isHtml(body)) {
          this.html = body;
          this.parseHtml();
        } else {
          this.data = body;
          this.processData();
        }
      }
    })
  }

  processData() {
    let price = null;
    try {
      price = JSON.parse(this.data)[0].p;
    } catch (e) {
      throw new Error('parsing price happen an error， the error is ')
    }
    if (+price <= +this.target) {
      const sms = new SMS({ price, url: this.oriURL});
      sms.send();
    } else {
      console.log(formatTime(new Date()), price);
      setTimeout(() => this.fetchData(), 30000);
    }
  }

}

module.exports = Monitor;
