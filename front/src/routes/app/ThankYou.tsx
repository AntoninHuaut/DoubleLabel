import { Button, Checkbox, Group, Space, Stack, Text } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

export function ThankYou() {
    return (
        <>
            <Stack align="center">
                <Text size="xl">You have completed the poll, thank you</Text>
            </Stack>
        </>
    );
}
