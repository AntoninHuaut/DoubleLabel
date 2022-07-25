import { Avatar, Button, Group, LoadingOverlay, Paper, Stack, Text, Textarea } from '@mantine/core';
import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LABELS_ARRAY, NB_IMAGE, randomSort } from '../../services/Labels.services';

export function TemplateOnePage() {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [isLoading, setLoading] = useState(false);

    const [isTextAreaDisable, setTextAreaDisable] = useState(false);
    const [isSubmitDisable, setSubmitDisable] = useState(false);

    const [emotionSelected, setEmotionSelected] = useState('');

    const [thought, setThought] = useState('');
    const btnLabels = useMemo(() => randomSort([...LABELS_ARRAY]), [count]);

    const onSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            nextImage();
        }, 250);
    };

    const nextImage = () => {
        setEmotionSelected('');
        setThought('');
        setCount((v) => (v + 1 >= NB_IMAGE ? 0 : v + 1));
    };

    useEffect(() => {
        setTextAreaDisable(emotionSelected === '');
        setThought('');
    }, [emotionSelected]);
    useEffect(() => setSubmitDisable(thought.length === 0 || emotionSelected === ''), [thought, emotionSelected]);

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
                    <Group position="center">
                        <Button onClick={() => navigate('/')}>Back</Button>
                        <Button color="gray" onClick={nextImage}>
                            Demo skip
                        </Button>
                    </Group>

                    <Avatar size={256} src={`/template/template_${count}.png`} radius={0} mt="md" mx="auto" mb="sm" />

                    <Group spacing="xs" position="center">
                        <Text align="center" size="xl" weight={700}>
                            Image #{count}
                        </Text>
                    </Group>

                    <Text align="center" size="sm" color="gray">
                        Choose the emotion that best fits this image.
                    </Text>

                    <Group spacing="sm" position="center">
                        {btnLabels.map((el, index) => (
                            <Button
                                key={index}
                                value={el}
                                variant="light"
                                color={emotionSelected === el ? 'teal' : 'blue'}
                                onClick={() => setEmotionSelected(el)}>
                                {el}
                            </Button>
                        ))}
                    </Group>

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

                    <Group mt="md" position="center">
                        <Button onClick={onSubmit} disabled={isSubmitDisable}>
                            Submit your choice
                        </Button>
                    </Group>
                </Stack>
            </Paper>
        </>
    );
}
