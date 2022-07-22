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
                        <Text>because it acts as an identifier for your "account".</Text>
                    </Group>
                    <Text>This id allows you to keep the history of the images that have been shown to you.</Text>
                </Stack>

                <Group>
                    {[
                        ['template-one', 'Demo One'],
                        ['template-two', 'Demo Two'],
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
