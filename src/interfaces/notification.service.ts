import { Notification } from "../model/notification.entities";

export interface INotificationService {
  getNotifications(data: any): unknown;
  createNotification(data: Notification): Promise<Object | null>;
  updateStatus(id: string): Promise<Object | null>;
}
