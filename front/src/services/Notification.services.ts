import { showNotification } from '@mantine/notifications';

interface NotifParams {
    title?: string;
    message: string;
    autoClose?: number;
}

export function errorNotif({ title = 'An error occurred', message, autoClose }: NotifParams) {
    genericNotif({
        title: title,
        message: message,
        color: 'red',
        autoClose: autoClose,
    });
}

export function successNotif({ title, message, autoClose }: NotifParams) {
    const autoCloseDefault = 3000;

    genericNotif({
        title: title,
        message: message,
        color: 'green',
        autoClose: autoClose ?? autoCloseDefault,
    });

    return autoClose;
}

export function genericNotif({ title, message, color, autoClose }: NotifParams & { autoClose?: number; color: string }) {
    showNotification({
        title: title,
        message: message,
        color: color,
        autoClose: autoClose,
    });
}
