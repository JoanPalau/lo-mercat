
const webPush = require('web-push')
import { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

webPush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
)

export default async function RegisterNotification(req: NextApiRequest, res: NextApiResponse) {
    const {
      query: { id },
      method,
  } = req
  if (method == 'POST') {
    const { subscription } = req.body
    console.log("[LOG] " + method + " with body " + JSON.stringify(req.body));

    await prisma.farmer.update({
      where: {
        id: id as string
      },
      data: {
        subscription: subscription as Prisma.JsonValue
      }
    })

    console.log('Registered FARMER!');
    res.status(204);    
  } else {
    res.statusCode = 405
    res.end()
  }
}