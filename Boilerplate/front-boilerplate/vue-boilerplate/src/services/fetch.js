import xhr from '@/services';
import { addUrlPrefix } from '@/utils';

const debug = process.env.NODE_ENV !== 'production';
const prefix = debug ? '/api' : '';

export const getSomething = () => xhr.commonGet(addUrlPrefix(prefix, '/get/url'), { query: { param: 'for-test' } });
export const postSomething = reqObj => xhr.commonPost(addUrlPrefix(prefix, '/post/url'), reqObj);

