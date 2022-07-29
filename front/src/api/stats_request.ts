import { BASE_API_URL, HttpMethod, mergeFetchOptions } from './request';

export const statsRequest = () => {
    return {
        url: `${BASE_API_URL}/get_survey_datas`,
        options: mergeFetchOptions({ method: HttpMethod.GET }),
    };
};
