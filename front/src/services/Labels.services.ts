export const NB_IMAGE = 8;
const LABELS = { Anger: ['Furious', 'Irritated'], Fear: ['Scared', 'Worried'] };
export const LABELS_ARRAY = Object.entries(LABELS)
    .map((entry) => entry[1].map((v: string) => `${v} (${entry[0]})`))
    .flatMap((m) => m);

export const randomSort = (array: any[]) =>
    array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
