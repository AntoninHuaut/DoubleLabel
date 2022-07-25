import { Loader, Space, Stack, Text } from '@mantine/core';
import { useEffect } from 'react';

import { useAuth } from '../../hooks/useAuth';

export function DeleteIdPage() {
    const { deleteId } = useAuth();

    useEffect(() => deleteId(), []);

    return (
        <Stack mt="xl" align="center" spacing="xs">
            <Text size="xl">Logout</Text>
            <Text color="gray">You are going to be redirected...</Text>
            <Space h="md" />
            <Loader size={64} variant="dots" />
        </Stack>
    );
}
