export interface Notification {
    id: string;
    title: string;
    description: string;
    sendAt: string;
    userId: string;
    href?: string;
}

export interface NotificationSchema {
    lastSeen: number;
}
