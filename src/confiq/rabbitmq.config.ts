import "dotenv/config";

export default {
  rabbitMQ: {
    url: String(process.env.RabbitMQ_Link),
    queues: {
      notificationQueue: "notification_queue",
    },
    heartbeat: 10,
  },
};
