import { BASE_API_URL, HttpMethod, mergeFetchOptions } from './request';

export const imageStatsRequest = () => {
    return {
        url: `${BASE_API_URL}/get_survey_datas`,
        options: mergeFetchOptions({ method: HttpMethod.GET }),
    };
};

export const userStatsRequest = () => {
    return {
        url: `${BASE_API_URL}/user_count`,
        options: mergeFetchOptions({ method: HttpMethod.GET }),
    };
};
