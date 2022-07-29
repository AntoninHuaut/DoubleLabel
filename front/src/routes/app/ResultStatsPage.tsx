import { Center, Grid, MultiSelect, Space } from '@mantine/core';
import { ResultEntry } from '../../components/template/ResultEntry';
import { useFetch } from '../../api/request';
import { useEffect, useState } from 'react';
import { statsRequest } from '../../api/stats_request';
import { IEmotionType, IStatsType } from '../../types/StatsType';
import { errorNotif } from '../../services/Notification.services';
import { emotionListRequest } from '../../api/poll_request';

const emotions = [
    { value: 'worried', label: 'Worried', group: 'Fear' },
    { value: 'scared', label: 'Scared', group: 'Fear' },
    { value: 'furious', label: 'Furious', group: 'Anger' },
    { value: 'irritated', label: 'Irritated', group: 'Anger' },
];

export function ResultStatsPage() {
    const [statsList, setStatsList] = useState<IStatsType>({});
    const [emotionsList, setEmotionsList] = useState<string[]>([]);
    const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

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
        statsFetch.makeRequest(statsRequest());
    }, []);

    return (
        <>
            <Center>
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
            </Center>

            {/* TODO global resumate */}

            <Space h="xl" />

            <Grid>
                {Object.entries(statsList)
                    // .filter(([_, emotionNameObj]: [string, IEmotionType]) => selectedEmotions.includes(emotionNameObj.emotion)) // TODO WIP
                    .map(([imageId, emotionNameObj]: [string, IEmotionType], index) => {
                        return (
                            <Grid.Col key={index} xs={12} sm={6} md={6} lg={4} xl={3}>
                                <ResultEntry imageId={imageId} emotionNameObj={emotionNameObj} emotionsList={emotionsList} />
                            </Grid.Col>
                        );
                    })}
            </Grid>
        </>
    );
}
