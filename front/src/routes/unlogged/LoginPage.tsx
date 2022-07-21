import { Anchor, Button, Container, Paper, Text, TextInput, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Key } from 'tabler-icons-react';

import { useAuth } from '../../hooks/useAuth';

export function LoginPage() {
    const auth = useAuth();
    const navigate = useNavigate();

    const [login, setLogin] = useState({ id: '' });
    const [isSignInEnable, setSignInEnable] = useState(false);

    const onSubmit = () => auth.login(login.id);

    useEffect(() => setSignInEnable(auth.isValidId(login.id)), [login]);

    return (
        <Container size={420} my={40}>
            <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
                Welcome!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an id yet?{' '}
                <Anchor<'a'>
                    href="/register"
                    size="sm"
                    onClick={(evt) => {
                        evt.preventDefault();
                        navigate('/create-id');
                    }}>
                    Create id
                </Anchor>
            </Text>

            <Paper mt={30} radius="xl" p="lg" shadow="xl">
                <TextInput
                    mt="md"
                    label="Id"
                    name="id"
                    icon={<Key />}
                    placeholder="Your id"
                    value={login.id}
                    onChange={(evt) => setLogin((l) => ({ ...l, id: evt.target.value }))}
                    required
                />

                <Button fullWidth mt="xl" onClick={() => onSubmit()} disabled={!isSignInEnable}>
                    Sign in
                </Button>
            </Paper>
        </Container>
    );
}
