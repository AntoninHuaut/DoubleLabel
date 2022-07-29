import { emptyDir } from 'https://deno.land/std@0.149.0/fs/empty_dir.ts';
import { getData } from '/data.ts';
import { createOutputDirs } from '/outputDir.ts';

export const INPUT_DIR = 'input';
export const OUTPUT_DIR = '../front/public/images/';
export const EMOTIONS_ID = new Map<string, number>();
EMOTIONS_ID.set('worried', 1);
EMOTIONS_ID.set('furious', 2);
EMOTIONS_ID.set('scared', 3);
EMOTIONS_ID.set('irritated', 4);

const data = await getData();

// Check duplicate imageId
const imageIds = new Set<number>();
for (const emotion of data) {
    for (const image of emotion.files) {
        if (imageIds.has(image.imageId)) {
            console.error(`Duplicate imageId: ${image.imageId}`);
            Deno.exit(1);
        }
        imageIds.add(image.imageId);
    }
}

await emptyDir(OUTPUT_DIR);
await createOutputDirs(data);
Deno.writeTextFileSync('data.json', JSON.stringify(data, null, 2));
