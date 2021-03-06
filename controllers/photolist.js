const _ = require('lodash');
const path = require('path');
const RouterBase = require('../common/routerbase');
const config = require('../config');
const cos = require('../services/cos');
var COS = require('cos-nodejs-sdk-v5');



class ListImages extends RouterBase  {
    handle() {
      const bucket = config.cosFileBucket;
        const listPath = '/images';
        const listNum = 100;
        const pattern = 'eListFileOnly';
        const order = 1;
        const context = '';

        cos.list(bucket, listPath, listNum, pattern, order, context, (res) => {
            if (res.code !== 0) {
                this.res({ code: -1, msg: 'failed', data: {} });
                return;
            }

            this.res({
                code: 0,
                msg: 'ok',
                data: _.map(res.data.infos, 'access_url').filter(item => {
                    // 只返回`jpg/png`后缀图片
                    return ['.jpg', '.png'].includes(path.extname(item));
                }),
            });
            
        });

       
       
    }
     
}

module.exports = ListImages.makeRouteHandler();