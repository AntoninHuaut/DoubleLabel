import { IEmotion } from '/type.ts';

export function generateInsert(data: IEmotion[]) {
    let sql = `INSERT INTO "DL_IMAGE" ("id_image","id_emotion") VALUES `;

    for (const emotion of data) {
        for (const image of emotion.files) {
            sql += `(${image.imageId}, ${emotion.emotionId}), `;
        }
    }

    sql = sql.trim().replace(new RegExp(',$'), ';');

    Deno.writeTextFileSync('../back/database/insert_images.sql', sql);
}
