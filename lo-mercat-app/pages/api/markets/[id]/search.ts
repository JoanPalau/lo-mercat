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
            stock = await prisma.stock.findMany({
                where: {
                    farmer: {
                        Stand: {
                            some: {
                                marketId: marketId
                            }
                        }
                    },
                    product: {
                        name: {
                            contains: req.body.productName,
                            mode: 'insensitive',
                        } 
                    }
                },
                include: {
                    product: true,
                    farmer: {
                        select: {
                            Stand: {
                                where: {
                                    marketId: marketId
                                }
                            },
                            user: {
                                select: {
                                    name: true
                                }
                            }
                        },

                    }
                }
            });

            console.log("GET");
            res.status(200).json(stock);
            break
        default:
            res.setHeader('Allow', ['PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}