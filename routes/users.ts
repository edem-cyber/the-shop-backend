import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

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

        res.status(200).json(user);
    } catch (error: any) {
        console.log(error);
    }
});

module.exports = router;