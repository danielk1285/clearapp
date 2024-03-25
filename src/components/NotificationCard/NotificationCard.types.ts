export interface INotificationCard {
    title: string;
    icon: string;
    selectedNotifications: string[];
    setSelectedNotifications: (selectedNotifications: any) => void;
}