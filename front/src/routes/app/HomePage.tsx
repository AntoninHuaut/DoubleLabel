import { Button, Group, Space, Text, useMantineTheme } from '@mantine/core';

import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useMantineTheme();

    return (
        <>
            <Text size="xl">Your id: {user.id}</Text>
            <Space h="md" />

            <Group spacing={6}>
                <Text color={theme.primaryColor}>Keep it</Text>
                <Text>because it acts as an identifier for your "account".</Text>
            </Group>
            <Text>This id allows you to keep the history of the images that have been shown to you.</Text>

            <Space h="xl" />

            <Group>
                <Button
                    color={theme.primaryColor}
                    onClick={() => {
                        navigate('/app/template-one');
                    }}>
                    Template One
                </Button>
            </Group>
        </>
    );
}
