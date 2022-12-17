
const webPush = require('web-push')
import { prisma } from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

webPush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
)

export default async function Notification(req:NextApiRequest, res:NextApiResponse) {
  if (req.method == 'POST') {
    let subscriptions = await prisma.farmer.findMany({
      where: {
        subscription: undefined
      },
      select: {
        id: true,
        subscription: true
      }
    })
    console.log('Notification API!');
    subscriptions.forEach(element => {
      if (element.subscription == null) {
        return;
      }
      console.log('----------------------------------')
      console.log(element.id);
      console.log(element)
      console.log('----------------------------------')
      let subscription = element.subscription;
      webPush
      .sendNotification(
        subscription,
        JSON.stringify({ title: 'Hello Web Push', message: 'Your web push notification is here!' })
      )
      
    });
    res.status(200);
    res.end();
  } else {
    res.statusCode = 405
    res.end()
  }
}