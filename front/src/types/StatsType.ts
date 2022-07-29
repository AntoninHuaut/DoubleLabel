export interface IEmotionType {
    // emotion: string;
    // guess: { [emotionName: string]: number[] };
    [emotionName: string]: number[];
}

export interface IStatsType {
    [imageId: number]: IEmotionType;
}
