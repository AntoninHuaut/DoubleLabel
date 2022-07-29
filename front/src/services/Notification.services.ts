import { showNotification } from '@mantine/notifications';

export function errorNotif(message: string) {
    showNotification({
        title: 'An error occurred',
        message: message,
        color: 'red',
    });
}

export function successNotif(message: string, title?: string) {
    showNotification({
        title: title,
        message: message,
        color: 'green',
    });
}
