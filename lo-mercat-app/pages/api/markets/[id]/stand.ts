import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default async function entrypoint(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id },
        method,
    } = req
    let stock = null;
    let marketId = id as string;
    console.log("[LOG] " + method + " with query " + JSON.stringify(req.query));
    //res.status(200).json({hello:'world'});
    switch (method) {
        case 'GET':
            // Get Stands
            stock = await prisma.stand.findMany({
                where: {
                    farmer: {
                        Stand: {
                            some: {
                                marketId: marketId
                            }
                        }
                    },
                },
                include: {
                    farmer: {
                        select: {
                            name:true,
                            user: {
                                select: {
                                    name: true
                                }
                            },
                            
                        },
                    }
                }
            });

            console.log("GET");
            res.status(200).json(stock);
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}