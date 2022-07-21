import { getData } from '/data.ts';
import { createOutputDirs } from '/outputDir.ts';

export const INPUT_DIR = 'input';
export const OUTPUT_DIR = 'output';

const data = await getData();
await createOutputDirs(data);
Deno.writeTextFileSync('data.json', JSON.stringify(data, null, 2));
