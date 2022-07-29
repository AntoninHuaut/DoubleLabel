export const LABELS = ['Furious', 'Irritated', 'Scared', 'Worried', 'Happy', 'Sad', 'Surprise', 'Other']; // TODO from server

export const randomSort = (array: any[]) =>
    array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
