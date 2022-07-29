import { ActionIcon, Avatar, Button, Group, LoadingOverlay, Paper, Space, Stack, Text, Textarea } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eraser } from 'tabler-icons-react';

import { emotionListRequest, imageIdRequest, registerAnswerRequest } from '../../api/poll_request';
import { useFetch } from '../../api/request';
import { ButtonNumberBadger } from '../../components/template/ButtonNumberBadger';
import { useAuth } from '../../hooks/useAuth';
import { randomSort } from '../../services/Labels.services';

function error(errorMsg: string) {
    showNotification({
        title: 'An error occurred',
        message: errorMsg,
        color: 'red',
    });
}

export function LabelImage() {
    const auth = useAuth();
    const navigate = useNavigate();

    const [labelPriority, setLabelPriority] = useState<string[]>([]);
    const [imageId, setImageId] = useState(-1);
    const [btnLabels, setBtnLabels] = useState<string[]>([]);

    const [thought, setThought] = useState('');

    const [isTextAreaDisable, setTextAreaDisable] = useState(false);
    const [isSubmitDisable, setSubmitDisable] = useState(false);
    const [isGlobalLoading, setGlobalLoading] = useState(false);

    const [waitReset, setWaitReset] = useState(false);

    const imageIdFetch = useFetch({
        onData: (data) => {
            setImageId(data.id);
            setWaitReset(false);
        },
        onError: (err) => error(err.message),
    });

    const pollFetch = useFetch({
        onData: () =>
            showNotification({
                message: 'Successfully registered answer',
                color: 'green',
            }),
        onError: (err) => error(err.message),
        onAfterRequest: () => nextImage(),
    });

    const emotionFetch = useFetch({
        onData: (data) => setBtnLabels(randomSort(data.map((s: string) => s && s[0].toUpperCase() + s.slice(1)))),
        onError: (err) => error(err.message),
    });

    useEffect(
        () => setGlobalLoading(imageIdFetch.isLoading || pollFetch.isLoading || emotionFetch.isLoading || waitReset || btnLabels.length === 0),
        [imageIdFetch.isLoading, pollFetch.isLoading, emotionFetch.isLoading, waitReset, btnLabels]
    );

    const onSubmit = () => {
        setWaitReset(true);
        pollFetch.makeRequest(registerAnswerRequest({ userId: auth.user.id, imageId: imageId, emotions: labelPriority, thought }));
    };

    useEffect(() => {
        if (imageId == -2) {
            navigate('/app/thank-you');
        }
    });

    const getNewImageId = () => imageIdFetch.makeRequest(imageIdRequest({ userId: auth.user.id }));

    useEffect(() => {
        emotionFetch.makeRequest(emotionListRequest());
        getNewImageId();
    }, []);

    const resetPriority = () => setLabelPriority([]);
    const nextImage = async () => {
        await getNewImageId();
        resetPriority();
        setThought('');
    };

    useEffect(() => {
        setTextAreaDisable(labelPriority.length === 0);
        if (labelPriority.length === 0) {
            setThought('');
        }
    }, [labelPriority]);

    useEffect(() => setSubmitDisable(thought.length === 0 || labelPriority.length === 0), [thought, labelPriority]);

    return (
        <>
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
                <LoadingOverlay visible={isGlobalLoading} />

                <Stack spacing="sm">
                    <Text align="center" size="xl" weight={700}>
                        Image #{imageId}
                    </Text>

                    <Avatar size={256} src={`/images/${imageId}.png`} radius={0} mx="auto" mb="sm" />

                    <Stack spacing={0}>
                        <Group spacing={0} position="center">
                            {btnLabels.map((el, index) => (
                                <ButtonNumberBadger key={index} value={el} labelPriority={labelPriority} setLabelPriority={setLabelPriority} />
                            ))}
                        </Group>

                        <Group spacing={4} ml={-16} position="center">
                            <ActionIcon size="sm" color="yellow" onClick={resetPriority} disabled={labelPriority.length === 0}>
                                <Eraser />
                            </ActionIcon>

                            <Text
                                onClick={resetPriority}
                                size="sm"
                                sx={{
                                    cursor: labelPriority.length === 0 ? 'default' : 'pointer',
                                }}>
                                Reset your choices
                            </Text>
                        </Group>
                    </Stack>

                    <Textarea
                        placeholder="Your thought"
                        label="Feeling"
                        description="Why did you choose these emotions? Describe what characteristics guided your choice."
                        radius="lg"
                        value={thought}
                        onChange={(event) => setThought(event.currentTarget.value)}
                        disabled={isTextAreaDisable}
                        required
                    />

                    <Group mt="md" position="apart">
                        <Button variant="outline" onClick={() => navigate('/')}>
                            Back
                        </Button>
                        <Group position="center">
                            <Button onClick={onSubmit} disabled={isSubmitDisable || isGlobalLoading}>
                                Submit your choice
                            </Button>
                        </Group>
                        <Space w={80} />
                    </Group>
                </Stack>
            </Paper>
        </>
    );
}
