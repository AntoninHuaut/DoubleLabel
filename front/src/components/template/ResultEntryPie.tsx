import { Center, Container, Text } from '@mantine/core';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';

import { IEmotionType } from '../../types/StatsType';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = (opacity: number) => [
    `rgba(255, 0, 41, ${opacity})`,
    `rgba(55, 126, 184, ${opacity})`,
    `rgba(102, 166, 30, ${opacity})`,
    `rgba(152, 78, 163, ${opacity})`,

    `rgba(255, 127, 0, ${opacity})`,
    `rgba(255, 255, 51, ${opacity})`,
    `rgba(166, 118, 29, ${opacity})`,
    `rgba(247, 129, 191, ${opacity})`,
];

interface ResultEntryPieProps {
    pieCount: number;
    emotionObj: IEmotionType;
    emotionsList: string[];
}

export function ResultEntryPie({ pieCount, emotionObj, emotionsList }: ResultEntryPieProps) {
    const labels = [];
    const data = [];

    const title = pieCount === 0 ? 'All emotion votes [points ranking]' : `Emotion votes at rank #${pieCount}`;

    if (pieCount === 0) {
        for (const emotion of emotionsList) {
            if (emotion in emotionObj.points) {
                const value = emotionObj.points[emotion];
                if (value > 0) {
                    labels.push(emotion);
                    data.push(value);
                }
            }
        }
    } else {
        for (const emotion of emotionsList) {
            if (emotion in emotionObj.ranks) {
                const value = emotionObj.ranks[emotion][pieCount - 1];
                if (value > 0) {
                    labels.push(emotion);
                    data.push(value);
                }
            }
        }
    }

    const finalData = {
        labels,
        datasets: [
            {
                label: title,
                data: data,
                backgroundColor: COLORS(0.2),
                borderColor: COLORS(1),
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <Container style={{ height: '160px' }}>
                {labels.length > 0 ? (
                    <Pie
                        data={finalData}
                        plugins={[ChartDataLabels]}
                        options={{
                            maintainAspectRatio: false,
                            animation: false,
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                datalabels: {
                                    formatter: function (value: any, context: any) {
                                        const emotionLabel = context.chart.data.labels[context.dataIndex];
                                        if (!emotionLabel) return 'No data';

                                        const valueStr = ('(' + value).padStart(Math.round(emotionLabel.length / 2 + 2), ' ') + ')';
                                        return emotionLabel[0].toUpperCase() + emotionLabel.slice(1) + `\n${valueStr}`;
                                    },
                                },
                            },
                        }}
                    />
                ) : (
                    <Center style={{ height: '160px' }}>
                        <Text style={{ fontStyle: 'italic' }} align="center">
                            No data
                        </Text>
                    </Center>
                )}
            </Container>
            <Text align="center" size="sm">
                {title}
            </Text>
        </>
    );
}
