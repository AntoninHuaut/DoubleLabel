import { IEmotionType } from '../../types/StatsType';
import { useMemo } from 'react';
import { Container, Table } from '@mantine/core';

interface ResultGroupEmotionProps {
    stats: [string, IEmotionType][];
}

interface StatsPoints {
    validPoint: number;
    totalPoint: number;
    rankOneOrTwo: number;
    totalRank: number;
}

/**
 * @param values
 * @returns -1 or 0-7
 */
function getRank(values: number[]) {
    return values.indexOf(1);
}

function computeStats(stats: [string, IEmotionType][]) {
    const emotionStats: Record<string, StatsPoints> = {};

    for (const [_imageId, emotionObj] of stats) {
        const emotionName = emotionObj.emotion;
        const points = emotionObj.points;
        const ranks = emotionObj.ranks;

        if (!(emotionName in emotionStats)) {
            emotionStats[emotionName] = {
                validPoint: 0,
                totalPoint: 0,
                rankOneOrTwo: 0,
                totalRank: 0,
            };
        }

        for (const [key, value] of Object.entries(points)) {
            if (key === emotionName) {
                emotionStats[emotionName].validPoint += value;
            }

            emotionStats[emotionName].totalPoint += value;
        }

        for (const [key, value] of Object.entries(ranks)) {
            const rank = getRank(value);
            if (key === emotionName && rank <= 1) {
                emotionStats[emotionName].rankOneOrTwo += 1;
            }

            emotionStats[emotionName].totalRank += 1;
        }
    }

    return emotionStats;
}

export function ResultGroupEmotion({ stats }: ResultGroupEmotionProps) {
    const computedStats = useMemo(() => computeStats(stats), [stats]);

    const rows = Object.entries(computedStats).map(([emotionName, { validPoint, totalPoint, rankOneOrTwo, totalRank }]) => (
        <tr key={emotionName}>
            <td>{emotionName}</td>
            <td>{((validPoint / totalPoint) * 100).toFixed(2)}%</td>
            <td>{((rankOneOrTwo / totalRank) * 100).toFixed(2)}%</td>
        </tr>
    ));

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>Emotion name</th>
                        <th>(Points corresponding to the emotion / All points obtained) %</th>
                        <th>(Ranked 1 or 2) / (All ranks obtained) %</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </Container>
    );
}
