import { walk } from 'fs';
import { EMOTIONS_ID, INPUT_DIR, OUTPUT_DIR } from '/app.ts';
import { IEmotion } from '/type.ts';

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
            const ext = entry.name.split('.').pop()?.toLowerCase();
            if (!['png', 'jpg', 'jpeg', 'tiff'].includes(ext ?? '')) continue;

            files.push(entry.name);
        }
    }
    return files;
}

function getEmotionId(emotionFolder: string) {
    if (!EMOTIONS_ID.has(emotionFolder)) {
        console.error(`Unknown emotion folder: ${emotionFolder}`);
        Deno.exit(1);
    }

    return EMOTIONS_ID.get(emotionFolder) ?? -1;
}

const cyrb53 = function (str: string) {
    let h1 = 0xdeadbeef ^ 0,
        h2 = 0x41c6ce57 ^ 0;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

function getImageId(emotionFolder: string, imageFile: string) {
    return parseInt(`${getEmotionId(emotionFolder)}${cyrb53(imageFile)}`);
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
                    return {
                        imageId: imageId,
                        inputPath: `${INPUT_DIR}/${emotionFolder}/${inputFile}`,
                        outputPath: `${OUTPUT_DIR}/${imageId}.png`,
                    };
                }),
            };
        })
    );
}
