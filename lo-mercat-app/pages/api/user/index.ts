import type { NextApiRequest, NextApiResponse } from 'next'
import { updateOrCreate } from '../api_utils';

import { prisma } from '../../../lib/prisma';


export default async function entrypoint(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { },
        method,
    } = req

    console.log("[LOG] " + method + " with query " + JSON.stringify(req.query));
    //res.status(200).json({hello:'world'});
    let Name = req.body.name as string;
    let Email = req.body.email as string;
    let Password = req.body.password as string;
    let Role = req.body.role as string;

    switch (method) {
        case 'POST':
            // Update or create data in your database
            let user = await updateOrCreate({
                schema: prisma.user,
                where: {
                    email: Email,
                },
                update: {
                },
                create: {
                    name: Name,
                    email: Email,
                    password: Password,
                    role: Role
                },
            }
            );

            res.status(200).json({ user })
            break
        default:
            res.setHeader('Allow', ['PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}