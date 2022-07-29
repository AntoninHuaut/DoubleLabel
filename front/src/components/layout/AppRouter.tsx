import { useRoutes } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { ProtectedLayout } from '../../layouts/ProtectedLayout';
import { UnProtectedLayout } from '../../layouts/UnProtectedLayout';
import { DeleteIdPage } from '../../routes/app/DeleteIdPage';
import { HomePage } from '../../routes/app/HomePage';
import { IndexPage } from '../../routes/IndexPage';
import { PageNotFound } from '../../routes/PageNotFound';
import { CreateIdPage } from '../../routes/unlogged/CreateIdPage';
import { LabelImagePage } from '../../routes/app/LabelImagePage';
import { ThankYouPage } from '../../routes/app/ThankYouPage';
import { ResultStatsPage } from '../../routes/app/ResultStatsPage';

export function AppRouter() {
    const { isLoadingUser, loadingElement } = useAuth();
    const routes = useRoutes([
        {
            path: '/',
            element: <UnProtectedLayout />,
            children: [
                { path: '/', element: <IndexPage /> },
                { path: '/create-id', element: <CreateIdPage /> },
            ],
        },
        {
            path: '/app',
            element: <ProtectedLayout />,
            children: [
                { path: '/app/home', element: <HomePage /> },
                { path: '/app/result-stats', element: <ResultStatsPage /> },
                { path: '/app/delete-id', element: <DeleteIdPage /> },
                { path: '/app/label-image', element: <LabelImagePage /> },
                { path: '/app/thank-you', element: <ThankYouPage /> },
            ],
        },
        {
            path: '*',
            element: <PageNotFound />,
        },
    ]);

    return isLoadingUser ? loadingElement() : routes;
}
