import { Button, Center, Collapse, Grid, Group, List, LoadingOverlay, MultiSelect, Space, Stack, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

import { emotionListRequest } from '../../api/poll_request';
import { useFetch } from '../../hooks/useFetch';
import { imageStatsRequest } from '../../api/stats_request';
import { GlobalResult } from '../../components/template/GlobalResult';
import { ResultEntry } from '../../components/template/ResultEntry';
import { errorNotif } from '../../services/Notification.services';
import { IEmotionType, IStatsType } from '../../types/StatsType';

const emotions = [
    { value: 'worried', label: 'Worried', group: 'Fear' },
    { value: 'scared', label: 'Scared', group: 'Fear' },
    { value: 'furious', label: 'Furious', group: 'Anger' },
    { value: 'irritated', label: 'Irritated', group: 'Anger' },
];

export function ResultStatsPage() {
    const [statsList, setStatsList] = useState<IStatsType>({});
    const [statsListFiltered, setStatsListFiltered] = useState<[string, IEmotionType][]>([]);

    const [emotionsList, setEmotionsList] = useState<string[]>([]);
    const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

    const [helpOpened, setHelpOpened] = useState(false);

    const emotionFetch = useFetch({
        onData: (data) => setEmotionsList(data.sort((a: string, b: string) => a.localeCompare(b))),
        onError: (error) => errorNotif(error.message),
    });

    const statsFetch = useFetch({
        onData: (data) => setStatsList(data),
        onError: (error) => errorNotif(error.message),
    });

    useEffect(() => {
        emotionFetch.makeRequest(emotionListRequest());
        statsFetch.makeRequest(imageStatsRequest());
    }, []);

    useEffect(() => {
        setStatsListFiltered(
            Object.entries(statsList).filter(
                ([_, emotionObj]: [string, IEmotionType]) => selectedEmotions.length === 0 || selectedEmotions.includes(emotionObj.emotion)
            )
        );
    }, [selectedEmotions, statsList]);

    return (
        <>
            <Group position={'apart'}>
                <Button onClick={() => setHelpOpened((o) => !o)}>Toggle help</Button>

                <MultiSelect
                    size="md"
                    value={selectedEmotions}
                    onChange={setSelectedEmotions}
                    data={emotions}
                    label="Select the emotions that you want to display stats"
                    placeholder="Pick all that you want"
                    clearButtonLabel="Clear selection"
                    clearable
                    transitionDuration={150}
                    maxDropdownHeight={300}
                    transition="pop-top-left"
                    transitionTimingFunction="ease"
                />

                <Space w={132} />
            </Group>

            <GlobalResult emotionObj={statsListFiltered} />

            <Collapse mt="md" in={helpOpened}>
                <Title align="center" order={3}>
                    Ranking by points
                </Title>
                <Text align="center">
                    The ranking by point allows to visualize all the votes of an image by taking into account the rank voted by the user.
                </Text>
                <Center>
                    <List center>
                        <List.Item>Rank 1: 4 points</List.Item>
                        <List.Item>Rank 2: 3.5 points</List.Item>
                        <List.Item>Rank 3: 3 points</List.Item>
                        <List.Item>Rank 4: 2.5 points</List.Item>
                        <List.Item>Rank 5: 2 points</List.Item>
                        <List.Item>Rank 6: 1.5 point</List.Item>
                        <List.Item>Rank 7: 1 point</List.Item>
                        <List.Item>Rank 8: 0.5 point</List.Item>
                    </List>
                </Center>
            </Collapse>

            <Space h="xl" />

            <Grid>
                <LoadingOverlay visible={statsFetch.isLoading} />

                {statsListFiltered.map(([imageId, emotionObj]: [string, IEmotionType], index) => {
                    return (
                        <Grid.Col key={index} xs={12} sm={6} md={6} lg={4} xl={3}>
                            <ResultEntry imageId={imageId} emotionObj={emotionObj} emotionsList={emotionsList} />
                        </Grid.Col>
                    );
                })}
            </Grid>
        </>
    );
}
