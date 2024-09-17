import ejs from "ejs";
import path from "path";
import moment from "moment";
import sendMail from "../utils/sendMail";
import { INotificationService } from "../interfaces/notification.service";
import { Notification } from "../model/notification.entities";

export class NotificationController {
  constructor(private service: INotificationService) {}

  sendActivationMail = async (data: any) => {
    const currentDate: string = moment().format("DD MM YYYY");
    const userData = {
      user: { name: data.name },
      activationCode: data.code,
      currentDate: currentDate,
    };

    const html = await ejs.renderFile(
      path.join(__dirname, "../mails/activation-mail.ejs"),
      userData
    );
    try {
      await sendMail({
        email: data.email,
        subject: "Activate your account",
        template: "activation-mail.ejs",
        data: userData,
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  sendResetMail = async (data: any) => {
    const currentDate: string = moment().format("DD MM YYYY");
    console.log("UserDetails:", data);
    const userData = {
      user: { name: data.name },
      resetCode: data.resetCode,
      currentDate: currentDate,
    };
    const html = await ejs.renderFile(
      path.join(__dirname, "../mails/reset-mail.ejs"),
      userData
    );
    try {
      await sendMail({
        email: data.email,
        subject: "Rest your password",
        template: "reset-mail.ejs",
        data: userData,
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  createNotification = (data: Notification) => {
    try {
      const response = this.service.createNotification(data);
      return response
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
