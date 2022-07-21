import { Space, Text } from '@mantine/core';
import { useEffect } from 'react';

import { useAuth } from '../../hooks/useAuth';

export function DeleteIdPage() {
    const { deleteId } = useAuth();

    useEffect(() => deleteId(), []);

    return (
        <>
            <Text size="xl">Logout</Text>
            <Space />
            <Text color="gray">You are going to be redirected...</Text>
        </>
    );
}
