import { Avatar, Burger, Group, Header, MediaQuery, Title, useMantineTheme } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { Logout } from 'tabler-icons-react';
import { LogoutButton } from './LogoutButton';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useAuth } from '../../hooks/useAuth';

interface AppHeaderProps {
    opened: boolean;
    setOpened: Dispatch<SetStateAction<boolean>>;
}

export function AppHeader(props: AppHeaderProps) {
    const { user } = useAuth();
    const theme = useMantineTheme();
    const { opened, setOpened } = props;

    return (
        <Header height={56} px="md">
            <div style={{ height: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Burger opened={opened} onClick={() => setOpened((v) => !v)} size="sm" color={theme.colors.gray[6]} />
                </MediaQuery> */}

                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Group position="apart">
                        <Link to={'/'}>
                            <Avatar size={32} radius={0} src={'/logo.png'} />
                        </Link>
                        <Title order={4}>Double Label</Title>
                    </Group>
                </MediaQuery>

                <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                    <Group position="apart">
                        <Link to={'/'}>
                            <Avatar size={42} radius={0} src={'/logo.png'} />
                        </Link>
                        <Title order={2}>Double Label</Title>
                    </Group>
                </MediaQuery>

                <Group>
                    <ThemeSwitcher />

                    {/* {user && <LogoutButton />} */}
                </Group>
            </div>
        </Header>
    );
}
