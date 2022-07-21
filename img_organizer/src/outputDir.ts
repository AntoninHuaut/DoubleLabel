import { copy, ensureDir } from 'fs';
import { IEmotion } from '/type.ts';
import { OUTPUT_DIR } from '/app.ts';

export async function createOutputDirs(data: IEmotion[]) {
    await Promise.all(
        data.map(async (emotion) => {
            const outputEmotionFolder = `${OUTPUT_DIR}/${emotion.emotionName}`;
            await ensureDir(outputEmotionFolder);
            await Promise.all(emotion.files.map((file) => copy(file.inputPath, file.outputPath)));
        })
    );
}
