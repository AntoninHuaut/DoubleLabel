import { IImageIdRequest, ILabedImagedRequest, IRequestAnswerRequest } from '../types/FormType';
import { BASE_API_URL, HttpMethod, mergeFetchOptions } from './request';

export const registerAnswerRequest = (body: IRequestAnswerRequest, captcha: string) => {
    return {
        url: `${BASE_API_URL}/register_answer`,
        options: mergeFetchOptions({ method: HttpMethod.POST, body: JSON.stringify({ ...body, captcha }) }),
    };
};

export const imageIdRequest = (body: IImageIdRequest) => {
    return {
        url: `${BASE_API_URL}/get_image`,
        options: mergeFetchOptions({ method: HttpMethod.POST, body: JSON.stringify(body) }),
    };
};

export const emotionListRequest = () => {
    return {
        url: `${BASE_API_URL}/get_emotion_list`,
        options: mergeFetchOptions({ method: HttpMethod.GET }),
    };
};

export const labedImageRequest = (body: ILabedImagedRequest) => {
    return {
        url: `${BASE_API_URL}/get_picture_count`,
        options: mergeFetchOptions({ method: HttpMethod.POST, body: JSON.stringify(body) }),
    };
};
