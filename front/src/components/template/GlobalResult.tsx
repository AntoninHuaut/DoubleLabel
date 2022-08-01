import { Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useFetch } from '../../api/request';
import { IEmotionType, IUserStats } from '../../types/StatsType';
import { userStatsRequest } from '../../api/stats_request';
import { errorNotif } from '../../services/Notification.services';

interface GlobalResultProps {
    emotionObj: [string, IEmotionType][];
}

export function GlobalResult({ emotionObj }: GlobalResultProps) {
    const [totalVotes, setTotalVotes] = useState(-1);
    const [totalUsers, setTotalUsers] = useState(-1);

    const emotionFetch = useFetch({
        onData: (data: IUserStats) => setTotalUsers(data.users),
        onError: (error) => errorNotif(error.message),
    });

    useEffect(() => {
        emotionFetch.makeRequest(userStatsRequest());
    }, []);

    useEffect(() => {
        let tmpNotes = 0;
        for (const row of emotionObj) {
            for (const votesArray of Object.values(row[1].ranks)) {
                tmpNotes = tmpNotes + votesArray.reduce((a, b) => a + b);
            }
        }

        setTotalVotes(tmpNotes);
    }, [emotionObj]);

    return (
        <>
            <Text mt="sm" align="center">
                Total votes: {totalVotes} | Total unique users: {totalUsers}
            </Text>
        </>
    );
}
