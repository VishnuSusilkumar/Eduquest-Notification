import { INotificationRepository } from "../interfaces/notification.repository";
import { INotificationService } from "../interfaces/notification.service";
import { Notification } from "../model/notification.entities";

export class NotificationService implements INotificationService {
  constructor(private repository: INotificationRepository) {}
  getNotifications(data: any): Promise<Notification[] | null> {
    return this.repository.getNotifications(data);
  }

  createNotification(data: Notification): Promise<Object | null> {
    return this.repository.createNotification(data);
  }
  updateStatus(id: string): Promise<Object | null> {
    return this.repository.updateStatus(id);
  }
}
