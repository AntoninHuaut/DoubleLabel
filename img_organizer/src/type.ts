export interface IEmotion {
    emotionId: number;
    emotionName: string;
    files: IFiles[];
}

export interface IFiles {
    imageId: number;
    inputPath: string;
    outputPath: string;
}
