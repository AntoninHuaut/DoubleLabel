import { ActionIcon, Avatar, Button, Group, LoadingOverlay, Paper, Space, Stack, Text, Textarea } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eraser } from 'tabler-icons-react';

import { emotionListRequest, imageIdRequest, labedImageRequest, registerAnswerRequest } from '../../api/poll_request';
import { useFetch } from '../../api/request';
import { ButtonNumberBadger } from '../../components/template/ButtonNumberBadger';
import { useAuth } from '../../hooks/useAuth';
import { randomSort } from '../../services/Labels.services';
import { errorNotif, successNotif } from '../../services/Notification.services';
import { ILabedImagedResponse } from '../../types/FormType';

export function LabelImagePage() {
    const auth = useAuth();
    const navigate = useNavigate();

    const [labelPriority, setLabelPriority] = useState<string[]>([]);
    const [imageId, setImageId] = useState(-1);
    const [labeledImage, setLabeledImage] = useState(-1);
    const [btnLabels, setBtnLabels] = useState<string[]>([]);

    const [thought, setThought] = useState('');

    const [isTextAreaDisable, setTextAreaDisable] = useState(false);
    const [isSubmitDisable, setSubmitDisable] = useState(false);
    const [isGlobalLoading, setGlobalLoading] = useState(false);

    const [waitReset, setWaitReset] = useState(true);

    const emotionFetch = useFetch({
        onData: (data) => setBtnLabels(randomSort(data.map((s: string) => s && s[0].toUpperCase() + s.slice(1)))),
        onError: (err) => errorNotif(err.message),
    });

    const labedImageFetch = useFetch({
        onData: (data: ILabedImagedResponse) => setLabeledImage(data.pictures_count),
        onError: (err) => errorNotif(err.message),
    });

    const imageIdFetch = useFetch({
        onData: (data) => {
            setImageId(data.id);
            setWaitReset(false);
        },
        onError: (err) => errorNotif(err.message),
    });

    const pollFetch = useFetch({
        onData: () => {
            successNotif('Successfully registered answer');
            nextImage();
        },
        onError: (err) => {
            errorNotif(err.message);
            setWaitReset(false);
        },
    });

    const getNewImageId = () => imageIdFetch.makeRequest(imageIdRequest({ userId: auth.user.id }));

    const getLabedImage = () => labedImageFetch.makeRequest(labedImageRequest({ userId: auth.user.id }));

    useEffect(() => {
        emotionFetch.makeRequest(emotionListRequest());
        getNewImageId();
        getLabedImage();
    }, []);

    useEffect(
        () => setGlobalLoading(imageIdFetch.isLoading || pollFetch.isLoading || emotionFetch.isLoading || waitReset || btnLabels.length === 0),
        [imageIdFetch.isLoading, pollFetch.isLoading, emotionFetch.isLoading, waitReset, btnLabels]
    );

    const onSubmit = () => {
        setWaitReset(true);
        pollFetch.makeRequest(registerAnswerRequest({ userId: auth.user.id, imageId: imageId, emotions: labelPriority.map((s) => s.toLowerCase()), thought }));
    };

    useEffect(() => {
        if (imageId == -2) {
            navigate('/app/thank-you');
        }
    });

    const resetPriority = () => setLabelPriority([]);
    const nextImage = async () => {
        await getNewImageId();
        await getLabedImage();
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
                    {labeledImage >= 0 && (
                        <Text align="center" size="sm">
                            {labeledImage > 0 ? `You have labelled ${labeledImage} image${labeledImage == 1 ? '' : 's'}` : 'You have not labelled an image'}
                        </Text>
                    )}

                    <Avatar size={256} src={`/images/${imageId}.png`} radius={0} mx="auto" />

                    <Stack spacing={0} align="center">
                        <Text size="sm" color="dimmed" sx={{ fontStyle: 'italic' }}>
                            Choose in order of priority (1 = strongest) the emotion(s) associated with this face.
                        </Text>
                        <Text size="sm" color="dimmed" sx={{ fontStyle: 'italic' }}>
                            You don't have to rank all the emotions. Choose the emotions that you think correspond to the face.
                        </Text>
                    </Stack>

                    <Stack mt="sm" spacing={0}>
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
