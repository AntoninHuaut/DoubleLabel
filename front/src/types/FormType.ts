export interface IRequestAnswerRequest {
    userId: string;
    imageId: number;
    thought: string;
    emotions: string[];
}

export interface IImageIdRequest {
    userId: string;
}
