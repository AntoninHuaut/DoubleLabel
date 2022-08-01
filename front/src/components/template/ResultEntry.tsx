import { Avatar, Button, Center, Container, Group, Paper, Text } from '@mantine/core';
import { useState } from 'react';

import { IEmotionType } from '../../types/StatsType';
import { ResultEntryPie } from './ResultEntryPie';

interface ResultEntryProps {
    imageId: string;
    emotionObj: IEmotionType;
    emotionsList: string[];
}

export function ResultEntry({ imageId, emotionObj, emotionsList }: ResultEntryProps) {
    const [pieCount, setPieCount] = useState(0);
    const minPieCount = 0;
    const maxPieCount = emotionsList.length;

    const decrementPieCount = () => setPieCount((v) => (v > minPieCount ? v - 1 : v));
    const incrementPieCount = () => setPieCount((v) => (v < maxPieCount ? v + 1 : v));

    return (
        <Center>
            <Paper
                style={{ position: 'relative' }}
                radius="xl"
                p="lg"
                mx="auto"
                shadow="xl"
                sx={(theme) => ({
                    [theme.fn.largerThan('lg')]: {
                        width: 1100,
                    },
                    [theme.fn.smallerThan('lg')]: {
                        width: 900,
                    },
                    [theme.fn.smallerThan('md')]: {
                        width: 500,
                    },
                    [theme.fn.smallerThan('xs')]: {
                        width: 300,
                    },
                })}>
                <Avatar mx="auto" size={92} src={`/images/${imageId}.png`} radius="md" />

                <Text align="center" size="xs">
                    {emotionObj.emotion}
                </Text>
                <Text align="center" size="xs" mb="xs">
                    #{imageId}
                </Text>

                <ResultEntryPie emotionObj={emotionObj} emotionsList={emotionsList} pieCount={pieCount} />

                <Center mt="md">
                    <Group>
                        <Button variant="default" disabled={pieCount === minPieCount} onClick={decrementPieCount} compact sx={{ width: 110 }}>
                            <Text>{pieCount === minPieCount ? 'N/A' : pieCount === 1 ? 'Points ranking' : `Ranking #${pieCount - 1}`}</Text>
                        </Button>
                        <Button variant="default" disabled={pieCount === maxPieCount} onClick={incrementPieCount} compact sx={{ width: 110 }}>
                            <Text>{pieCount === maxPieCount ? 'N/A' : `Ranking #${pieCount + 1}`}</Text>
                        </Button>
                    </Group>
                </Center>
            </Paper>
        </Center>
    );
}
