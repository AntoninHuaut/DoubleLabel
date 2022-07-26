import { ActionIcon, Avatar, Button, Group, LoadingOverlay, Paper, Space, Stack, Text, Textarea } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eraser } from 'tabler-icons-react';

import { ButtonNumberBadger } from '../../components/template/ButtonNumberBadger';
import { LABELS_ARRAY, NB_IMAGE, randomSort } from '../../services/Labels.services';

export function LabelImage() {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [isLoading, setLoading] = useState(false);

    const [isTextAreaDisable, setTextAreaDisable] = useState(false);
    const [isSubmitDisable, setSubmitDisable] = useState(false);

    const [labelPriority, setLabelPriority] = useState<string[]>([]);

    const [thought, setThought] = useState('');
    const btnLabels = useMemo(() => randomSort([...LABELS_ARRAY]), [count]);

    const onSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            nextImage();
        }, 250);
    };

    const resetPriority = () => setLabelPriority([]);
    const nextImage = () => {
        resetPriority();
        setThought('');
        setCount((v) => (v + 1 >= NB_IMAGE ? 0 : v + 1));
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
                    [theme.fn.largerThan('md')]: {
                        width: 900,
                    },
                    [theme.fn.smallerThan('md')]: {
                        width: 500,
                    },
                    [theme.fn.smallerThan('xs')]: {
                        width: 300,
                    },
                })}>
                <LoadingOverlay visible={isLoading} />

                <Stack spacing="sm">
                    <Text align="center" size="xl" weight={700}>
                        Image #{count}
                    </Text>

                    <Avatar size={256} src={`/template/template_${count}.png`} radius={0} mx="auto" mb="sm" />

                    <Stack spacing={0}>
                        <Group spacing="xs" position="center">
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
                            <Button onClick={onSubmit} disabled={isSubmitDisable}>
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
