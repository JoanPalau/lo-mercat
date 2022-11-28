import type { NextApiRequest, NextApiResponse } from 'next'
import { updateOrCreate } from '../api_utils';
import { prisma } from '../../../lib/prisma';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';


async function createCustomer(c: any) {
    return await updateOrCreate({
        schema: prisma.customer,
        where: {
            name: c.name
        },
        update: c,
        create: c
    });
}
async function createFarmer(f: any) {
    return await updateOrCreate({
        schema: prisma.farmer,
        where: {
            name: f.name
        },
        update: f,
        create: f
    });
}


export default async function entrypoint(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { },
        method,
    } = req

    console.log("[LOG] " + method + " with query " + JSON.stringify(req.query) + " and body " + JSON.stringify(req.body));
    //res.status(200).json({hello:'world'});
    let Name = req.body.name as string;
    let Email = req.body.email as string;
    let Password = req.body.password as string;
    Password = await bcrypt.hash(Password, 10);
    let Role = req.body.role as string;
    let Gender = req.body.gender as string;

    switch (method) {
        case 'POST':
            // Update or create data in your database
            let user = await updateOrCreate<User>({
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
            });
            if (Role == "CUSTOMER") {
                await createCustomer({
                    name: Name,
                    birthday: new Date(1990, 1, 1),
                    userId: user.obj.id,
                    gender: Gender
                })
            } else if (Role == "FARMER") {
                await createFarmer({
                    name: Name,
                    birthday: new Date(1990, 1, 1),
                    userId: user.obj.id
                })
            }

            res.status(200).json(user)
            break
        default:
            res.setHeader('Allow', ['PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}