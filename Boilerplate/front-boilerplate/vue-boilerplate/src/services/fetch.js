import xhr from '@/services';
import utils from '@/utils';

const debug = process.env.NODE_ENV !== 'production';
const prefix = debug ? '/api' : '';

export const getSomething = () => xhr.commonGet(utils.addUrlPrefix(prefix, '/get/url'), { query: { param: 'for-test' } });
export const postSomething = reqObj => xhr.commonPost(utils.addUrlPrefix(prefix, '/post/url'), reqObj);
export const exampleGetSomething = () => xhr.commonGet(utils.addUrlPrefix(prefix, '/get/url'), { query: { param: 'for-test' } });
