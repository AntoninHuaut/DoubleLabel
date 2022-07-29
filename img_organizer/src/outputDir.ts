import { copy } from 'fs';
import { IEmotion } from '/type.ts';

export async function createOutputDirs(data: IEmotion[]) {
    await Promise.all(
        data.map(async (emotion) => {
            await Promise.all(emotion.files.map((file) => copy(file.inputPath, file.outputPath)));
        })
    );
}
