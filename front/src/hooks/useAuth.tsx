import { Center, Loader, Stack } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { customAlphabet } from 'nanoid';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { IUser } from '../types/LoginType';

const AuthContext = createContext<any>(null);
const ID_SIZE = 8;
const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNPQRSTUVWXYZ', ID_SIZE);

export interface MemoType {
    user: IUser;
    refreshUser: () => any;
    login: (id: string) => any;
    deleteId: () => any;
    createId: () => any;
    isValidId: (testId: string) => boolean;
    isLoadingUser: boolean;
    loadingElement: () => JSX.Element;
}

export const AuthProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
    const [user, setUser] = useState<IUser>();
    const [isLoadingUser, setLoadingUser] = useState<boolean>(true);
    const [idLocal, setIdLocal] = useLocalStorage({ key: 'id' });

    const loadingElement = () => (
        <Center style={{ height: '75vh' }}>
            <Stack>
                <Loader size={192} variant="dots" />
            </Stack>
        </Center>
    );

    const isValidId = (testId: string) => {
        return !!testId && testId.length === ID_SIZE;
    };

    const refreshUser = () => {
        setLoadingUser(true);

        if (isValidId(idLocal)) setUser({ id: idLocal });
        else setUser(null as unknown as IUser);

        setLoadingUser(false);
    };

    const createId = () => {
        setIdLocal(nanoid());
    };

    const login = (id: string) => {
        if (isValidId(id)) setIdLocal(id);
    };

    const deleteId = () => {
        setIdLocal('');
    };

    const value = useMemo(
        (): MemoType => ({
            user: user as IUser,
            refreshUser,
            login,
            deleteId,
            createId,
            isValidId,
            isLoadingUser,
            loadingElement,
        }),
        [user, isLoadingUser]
    );

    useEffect(() => {
        refreshUser();
    }, []);

    useEffect(() => {
        refreshUser();
    }, [idLocal]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): MemoType => {
    return useContext(AuthContext);
};
