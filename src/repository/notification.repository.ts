import { INotificationRepository } from "../interfaces/notification.repository";
import { Notification } from "../model/notification.entities";
import NotificationModel from "../model/schemas/notification.schema";
import cron from "node-cron";
import moment from "moment";

export class NotificationRepository implements INotificationRepository {
  async getNotifications(data: any): Promise<Notification[] | null> {
    try {
      const notificaitons = await NotificationModel.find({
        instructorId: data,
      });
      return notificaitons;
    } catch (e: any) {
      console.log(e.message);
      return null;
    }
  }

  async createNotification(data: Notification): Promise<Object | null> {
    try {
      const notification = await NotificationModel.create(data);
      return { success: true };
    } catch (e: any) {
      console.log(e.message);
      return null;
    }
  }

  async updateStatus(id: string): Promise<Object | null> {
    try {
      const notification = await NotificationModel.findByIdAndUpdate(id, {
        status: "read",
      });
      return { success: true };
    } catch (e: any) {
      console.log(e.message);
      return null;
    }
  }
}

// delete notification using cron job
cron.schedule("0 0 0 1 * *", async () => {
  // trigger once a month at midnight on the 1st day of the month
  const thirtyDaysAgo = moment().subtract(30, "days").toDate();
  await NotificationModel.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDaysAgo },
  });
});
