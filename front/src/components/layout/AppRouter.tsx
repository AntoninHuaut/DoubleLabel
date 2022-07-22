import { useRoutes } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { ProtectedLayout } from '../../layouts/ProtectedLayout';
import { UnProtectedLayout } from '../../layouts/UnProtectedLayout';
import { DeleteIdPage } from '../../routes/app/DeleteIdPage';
import { HomePage } from '../../routes/app/HomePage';
import { IndexPage } from '../../routes/IndexPage';
import { PageNotFound } from '../../routes/PageNotFound';
import { CreateIdPage } from '../../routes/unlogged/CreateIdPage';
import { LoginPage } from '../../routes/unlogged/LoginPage';
import { TemplateOnePage } from '../../routes/app/TemplateOnePage';

export function AppRouter() {
    const { isLoadingUser, loadingElement } = useAuth();
    const routes = useRoutes([
        {
            path: '/',
            element: <UnProtectedLayout />,
            children: [
                { path: '/', element: <IndexPage /> },
                { path: '/login', element: <LoginPage /> },
                { path: '/create-id', element: <CreateIdPage /> },
            ],
        },
        {
            path: '/app',
            element: <ProtectedLayout />,
            children: [
                { path: '/app/home', element: <HomePage /> },
                { path: '/app/delete-id', element: <DeleteIdPage /> },
                { path: '/app/template-one', element: <TemplateOnePage /> },
            ],
        },
        {
            path: '*',
            element: <PageNotFound />,
        },
    ]);

    return isLoadingUser ? loadingElement() : routes;
}
