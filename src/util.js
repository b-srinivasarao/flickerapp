import crypto from 'crypto-browserify';

export const formBaseString = (verb, url, queryString) => {
    return [verb, encodeURIComponent(url), encodeURIComponent(queryString)].join("&");
};
export const encodeRFC5987ValueChars = (str) => {
    return encodeURIComponent(str)
        .replace(/['()!]/g, escape)
        .replace(/\*/g, '%2A')
        .replace(/%(?:7C|60|5E)/g, unescape);
};
export const formQueryString = (queryArguments) => {
    const args = [],
        append = function (key) {
            args.push(key + "=" + encodeRFC5987ValueChars(queryArguments[key]));
        };
    Object.keys(queryArguments).sort().forEach(append);
    return args.join("&");
};

export const sign = (data, key, secret) => {
    var hmacKey = key + "&" + (secret ? secret : ''),
        hmac = crypto.createHmac("SHA1", hmacKey);
    hmac.update(data);
    var digest = hmac.digest("base64");
    return encodeURIComponent(digest);
};

export const setAuthVals = (options) => {
    var timestamp = "" + Date.now(),
        md5 = crypto.createHash('md5').update(timestamp).digest("hex"),
        nonce = md5.substring(0, 32);
    options.oauth_timestamp = timestamp;
    options.oauth_nonce = nonce;
    return options;
};
