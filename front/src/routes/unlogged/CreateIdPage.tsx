import { Center, Loader, Space, Stack, Text } from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function CreateIdPage() {
    const { createId } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        createId();
        navigate('/');
    }, []);

    return (
        <Stack mt="xl" align="center" spacing="xs">
            <Text size="xl">Creating identifier</Text>
            <Text color="gray">You are going to be redirected...</Text>
            <Space h="md" />
            <Loader size={64} variant="dots" />
        </Stack>
    );
}
