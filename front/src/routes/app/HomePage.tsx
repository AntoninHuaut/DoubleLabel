import { Button, Group, Space, Stack, Text, useMantineTheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

export function HomePage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useMantineTheme();

    return (
        <>
            <Stack align="center">
                <Group spacing={6}>
                    <Text size="xl">Your id: </Text>
                    <Text size="xl" color={theme.primaryColor}>
                        {user.id}
                    </Text>
                </Group>

                <Stack align="center" spacing={0}>
                    <Group spacing={6}>
                        <Text weight={700} color={theme.primaryColor}>
                            Keep it
                        </Text>
                        <Text>because it acts as an identifier.</Text>
                    </Group>
                    <Text>This id allows you to keep the history of the images that have been shown to you.</Text>
                    <Text>It will allow you to label images from different devices.</Text>
                </Stack>

                <Group>
                    {[
                        ['template-one', 'Demo Single choice'],
                        ['template-two', 'Demo Multiple choice'],
                    ].map((btnArray, index) => (
                        <Button
                            key={index}
                            color={theme.primaryColor}
                            onClick={() => {
                                navigate('/app/' + btnArray[0]);
                            }}>
                            {btnArray[1]}
                        </Button>
                    ))}
                </Group>
            </Stack>
        </>
    );
}
