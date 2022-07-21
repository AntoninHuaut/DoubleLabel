import { Group, ActionIcon } from '@mantine/core';
import { Logout } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';

export function LogoutButton() {
    const navigate = useNavigate();

    return (
        <Group position="center" my="xl">
            <Group position="center" my="xl">
                <ActionIcon
                    onClick={() => navigate('/app/delete-id')}
                    size="lg"
                    sx={(theme) => ({
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                        color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
                    })}>
                    <Logout size={18} />
                </ActionIcon>
            </Group>
        </Group>
    );
}
