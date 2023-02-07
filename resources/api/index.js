import { makeRequest } from "@/shared/lib/request";
var sendOrder = function (params) {
    return makeRequest({
        url: params.url,
        method: 'POST',
        data: params.data
    }, {
        status: 'ok'
    });
};
var api = {
    sendOrder: sendOrder
};
export default api;
