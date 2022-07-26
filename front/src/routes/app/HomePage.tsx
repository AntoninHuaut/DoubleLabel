import { Button, Checkbox, Group, Space, Stack, Text } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
    const navigate = useNavigate();
    const [tos, setTOS] = useLocalStorage({ key: 'tos', defaultValue: false });

    return (
        <>
            <Stack spacing="xs" align="center">
                <Stack spacing={0}>
                    <Text>You will participate in a survey on facial emotion recognition.</Text>
                    <Text>It is important to understand the purpose of the survey in order to obtain usable results.</Text>
                    <Space h="md" />
                    <Text>You will have a face of a person representing an emotion.</Text>
                    <Text>Choose in order of priority (1 = strongest) the emotion(s) associated with this face.</Text>
                    <Text>You don't have to rank all the emotions. Choose the emotions that you think correspond to the face.</Text>
                </Stack>

                <Space h="xl" />

                <Stack spacing={0} align="center">
                    <Checkbox
                        checked={tos}
                        onChange={(el) => setTOS(el.target.checked)}
                        label="I understand and agree that my responses may be used for research purposes."
                    />
                </Stack>

                <Space h="xs" />

                <Group>
                    <Button
                        disabled={!tos}
                        onClick={() => {
                            navigate('/app/label-image');
                        }}>
                        Start labeling images
                    </Button>
                </Group>
            </Stack>
        </>
    );
}
