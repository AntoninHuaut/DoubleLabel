import { walk } from 'fs';
import { INPUT_DIR, OUTPUT_DIR } from '/app.ts';
import { IEmotion } from '/type.ts';

const EMOTIONS_ID = new Map<string, number>();
const IMAGE_ID = new Map<string, number>();

async function getEmotionsFolders() {
    const folders = [];
    for await (const entry of walk(INPUT_DIR)) {
        if (entry.path === entry.name) continue;

        if (entry.isDirectory) {
            folders.push(entry.name);
        }
    }
    return folders;
}

async function getImagesFIles(inputFolder: string) {
    const files = [];
    for await (const entry of walk(`${INPUT_DIR}/${inputFolder}`)) {
        if (entry.isFile) {
            files.push(entry.name);
        }
    }
    return files;
}

function getId(map: Map<string, number>, key: string): number {
    if (map.has(key)) {
        return map.get(key) ?? -1;
    }

    const id = map.size + 1;
    map.set(key, id);
    return id;
}

function getEmotionId(emotionFolder: string) {
    return getId(EMOTIONS_ID, emotionFolder);
}

function getImageId(emotionFolder: string, imageFile: string) {
    return getId(IMAGE_ID, `${emotionFolder}/${imageFile}`);
}

export async function getData(): Promise<IEmotion[]> {
    const emotionFolder = await getEmotionsFolders();
    return Promise.all(
        emotionFolder.map(async (emotionFolder) => {
            return {
                emotionId: getEmotionId(emotionFolder),
                emotionName: emotionFolder,
                files: (await getImagesFIles(emotionFolder)).map((inputFile) => {
                    const imageId = getImageId(emotionFolder, inputFile);
                    const ext = inputFile.split('.').pop();
                    return {
                        imageId: imageId,
                        inputPath: `${INPUT_DIR}/${emotionFolder}/${inputFile}`,
                        outputPath: `${OUTPUT_DIR}/${emotionFolder}/${imageId}.${ext}`,
                    };
                }),
            };
        })
    );
}
