import url from 'url';

function beNocacheQueryObj(queryObj) {
    return Object.assign({}, queryObj, { _t: (new Date()).getTime() });
}

function addUrlPrefix(prefix, paths) {
    let resolvedUrl = url.resolve.apply(null, [].concat(paths));
    let addPrefix = '';
    if ((typeof prefix) === 'string') {
        addPrefix =
            prefix.lastIndexOf('/') === prefix.length - 1 ?
            prefix.slice(0, prefix.length - 1) :
            prefix;
        resolvedUrl =
            resolvedUrl.indexOf('/') === 0 ?
            resolvedUrl.slice(1) :
            resolvedUrl;
    }
    return `${addPrefix}/${resolvedUrl}`;
}

export default {
    beNocacheQueryObj,
    addUrlPrefix,
};
