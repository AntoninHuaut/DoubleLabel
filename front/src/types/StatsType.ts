export interface IEmotionType {
    emotion: string;
    ranks: { [emotionName: string]: number[] };
    points: { [emotionName: string]: number };
}

export interface IStatsType {
    [imageId: number]: IEmotionType;
}

export interface IUserStats {
    users: number;
}
