import * as amqp from "amqplib";
import "dotenv/config";
import { NotificationController } from "../../controller/notification.controller";
import { NotificationRepository } from "../../repository/notification.repository";
import { NotificationService } from "../../services/notification.service";

const repository = new NotificationRepository();
const service = new NotificationService(repository);
const controller = new NotificationController(service);

const Url = String(process.env.RabbitMQ_Link);
const queue = "activation-code";

const actionCode = async () => {
  try {
    const connection = await amqp.connect(Url);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue);

    channel.consume(queue, (data: any) => {
      const userdata = JSON.parse(data.content);
      controller.SendActivationMail(userdata);
      channel.ack(data);
    });
  } catch (error) {
    console.log(error);
  }
};

export default actionCode;
