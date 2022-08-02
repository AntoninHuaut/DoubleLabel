export interface IRequestAnswerRequest {
    userId: string;
    imageId: number;
    thought: string;
    emotions: string[];
}

export interface IImageIdRequest {
    userId: string;
}

export interface ILabedImagedRequest {
    userId: string;
}

export interface ILabedImagedResponse {
    pictures_count: number;
}
