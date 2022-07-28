import { IImageIdRequest, IRequestAnswerRequest } from '../types/FormType';
import { BASE_API_URL, HttpMethod, mergeFetchOptions } from './request';

export const registerAnswerRequest = (body: IRequestAnswerRequest) => {
    return {
        url: `${BASE_API_URL}/register_answer`,
        options: mergeFetchOptions({ method: HttpMethod.POST, body: JSON.stringify(body) }),
    };
};

export const imageIdRequest = (body: IImageIdRequest) => {
    return {
        url: `${BASE_API_URL}/get_image`,
        options: mergeFetchOptions({ method: HttpMethod.POST, body: JSON.stringify(body) }),
    };
};
