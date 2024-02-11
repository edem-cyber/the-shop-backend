import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createResponse } from '../utils/helper';

const prisma = new PrismaClient();

const router = express.Router();

// get a user by email
router.get('/getUserByEmail', async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });


    } catch (error: any) {
        console.log(error);
    }
});


// get all users
router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        const count = await prisma.user.count();

        createResponse(
            {
                res,
                statusCode: 200,
                statusText: 'OK',
                message: 'User found',
                data: {
                    count,
                    users,
                },
            }
        );
    } catch (error: any) {
        console.log(error);
    }
});
module.exports = router;