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
                <Text size="xl">TODO "rules"</Text>

                <Group>
                    <Button
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
