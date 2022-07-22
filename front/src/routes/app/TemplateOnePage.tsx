import { ActionIcon, Avatar, Button, Group, LoadingOverlay, Paper, Stack, Text, Textarea } from '@mantine/core';
import { useMemo, useState, useEffect } from 'react';
import { Backspace, Eraser, Trash } from 'tabler-icons-react';
import { ButtonNumberBadger } from '../../components/template/ButtonNumberBadger';
import { LabelPriority } from '../../types/Template';

const NB_IMAGE = 8;
const LABELS = { Anger: ['Furious', 'Irritated'], Fear: ['Scared', 'Worried'] };
const LABELS_ARRAY = Object.entries(LABELS)
    .map((entry) => entry[1].map((v: string) => `${v} (${entry[0]})`))
    .flatMap((m) => m);

const randomSort = (array: any[]) =>
    array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

export function TemplateOnePage() {
    const [count, setCount] = useState(0);
    const [isLoading, setLoading] = useState(false);

    const [isTextAreaDisable, setTextAreaDisable] = useState(false);
    const [isSubmitDisable, setSubmitDisable] = useState(false);

    const [labelPriority, setLabelPriority] = useState<LabelPriority>(Object.fromEntries(LABELS_ARRAY.map((el) => [el, 0])));
    const higherPriority = useMemo(() => Object.values(labelPriority).reduce((_a, _b) => (_a > _b ? _a : _b), 0), [labelPriority]);

    const [thought, setThought] = useState('');
    const btnLabels = useMemo(() => randomSort([...LABELS_ARRAY]), [count]);

    const onSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            nextImage();
        }, 500);
    };

    const resetPriority = () => setLabelPriority(Object.fromEntries(LABELS_ARRAY.map((el) => [el, 0])));
    const nextImage = () => {
        resetPriority();
        setThought('');
        setCount((v) => (v + 1 >= NB_IMAGE ? 0 : v + 1));
    };

    useEffect(() => {
        setTextAreaDisable(higherPriority === 0);
        if (higherPriority === 0) {
            setThought('');
        }
    }, [higherPriority]);
    useEffect(() => setSubmitDisable(thought.length === 0 || higherPriority === 0), [thought, higherPriority]);

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
                        <Button color="gray" onClick={nextImage}>
                            Demo skip
                        </Button>
                    </Group>

                    <Avatar size={256} src={`/template/template_${count}.png`} radius={0} mt="md" mx="auto" mb="sm" />

                    <Group spacing="xs" position="center">
                        <ActionIcon color="yellow" onClick={resetPriority} disabled={higherPriority === 0}>
                            <Eraser />
                        </ActionIcon>

                        <Text align="center" size="xl" weight={700}>
                            Image #{count}
                        </Text>
                    </Group>

                    <Group mt="md" spacing="xs" position="center">
                        {btnLabels.map((el, index) => (
                            <ButtonNumberBadger
                                key={index}
                                value={el}
                                labelPriority={labelPriority}
                                setLabelPriority={setLabelPriority}
                                higherPriority={higherPriority}
                            />
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
