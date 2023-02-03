import {makeRequest} from "@/shared/lib/request";

const sendOrder = (params: SendOrderParams) =>
    makeRequest<{status: string}>(
        {
            url: params.url,
            method: 'POST',
            data: params.data
        },
        {
            status: 'ok'
        }
    )

export type SendOrderParams = {
    url: string,
    data: unknown
}

const api = {
    sendOrder
}

export default api
