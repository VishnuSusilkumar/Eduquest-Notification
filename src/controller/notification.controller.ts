import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import { INotificationService } from "../interfaces/notification.service";
import { Notification } from "../model/notification.entities";

export class NotificationController {
  constructor(private service: INotificationService) {}

  SendActivationMail = async (data: any) => {
    const userdata = { user: { name: data.name }, activationCode: data.code };
    const html = await ejs.renderFile(
      path.join(__dirname, "../mails/activation-mail.ejs"),
      userdata
    );
    try {
      await sendMail({
        email: data.email,
        subject: "Activate your account",
        template: "activation-mail.ejs",
        data: userdata,
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  createNotification = (data: Notification) => {
    try {
      return this.service.createNotification(data);
    } catch (e: any) {
      console.log(e);
    }
  };

  getNotifications = (data: string) => {
    try {
      return this.service.getNotifications(data);
    } catch (e: any) {
      console.log(e);
    }
  };

  updateNotification = (data: string) => {
    try {
      return this.service.updateStatus(data);
    } catch (e: any) {
      console.log(e);
    }
  };
}
