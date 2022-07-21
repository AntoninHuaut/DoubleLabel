import { Group, Space, Text, useMantineTheme } from '@mantine/core';

import { useAuth } from '../../hooks/useAuth';

export function HomePage() {
    const { user } = useAuth();
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
        </>
    );
}
