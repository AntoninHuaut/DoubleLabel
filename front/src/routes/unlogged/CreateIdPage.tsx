import { Space, Text } from '@mantine/core';
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
        <>
            <Text size="xl">Creating identifier</Text>
            <Space />
            <Text color="gray">You are going to be redirected...</Text>
        </>
    );
}
