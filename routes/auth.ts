import { PrismaClient, } from "@prisma/client";
import { Request, Response, Router, ErrorRequestHandler } from "express";
import bcrypt from "bcrypt";
// import jwt 
import jwt from "jsonwebtoken";
import { CreateuserProps } from "../types/createuserprops";
// import joi 
import Joi from "joi";
import createHttpError from "http-errors";




const prisma = new PrismaClient();

const router = Router();
module.exports = router;

export const createUserFn = async (props: CreateuserProps) => {
    const { email, password, username, firstName, lastName, phoneNumber, bio } = props;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username,
                firstName,
                lastName,
                phoneNumber,
                bio,
            },
        });

        return user;
    } catch (error: any) {
        console.log(error);
        createHttpError(500, "Internal Server Error");

    } finally {
        await prisma.$disconnect();
    }
};

router.post('/signUp', async (req: Request, res: Response) => {
    const { email, password, username, firstName, lastName, phoneNumber, bio } = req.body;

    try {
        const user = await createUserFn({ email, password, username, firstName, lastName, phoneNumber, bio });
        const payload = { email: user?.email, password: user?.password };

        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRATION_TIME as string });

        res.status(201).json({ user, jwtToken });


    } catch (error: any) {
        console.log(error);

    } finally {
        await prisma.$disconnect();
    }
});

router.post('/signIn', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        const payload = { email: user?.email, password: user?.password };

        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRATION_TIME as string });

        if (!user) {
            res.status(401).json({ error: 'Invalid credentials.' });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(401).json({ error: 'Invalid credentials.' });
            return;
        }

        res.status(200).json({ user, jwtToken });
    } catch (error: any) {
        console.log(error);
    }
}
);

router.post('/signOut', async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        // get jwt token from the request header
        const jwtToken = req.headers.authorization?.split(" ")[1];
        // verify the jwt token
        jwt.verify(jwtToken as string, process.env.JWT_SECRET as string);
        if (jwtToken === undefined) {
            res.status(401).json(
                {
                    error: "Unauthorized",
                    status: 401,
                    statusText: "Unauthorized"
                }
            );
            return;
        }

    } catch (error: any) {
        createHttpError(500, "Internal Server Error");
        console.log(error);
    }
});

// get all users
router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error: any) {
        console.log(error);
    }
});

// create a user called "John Doe"
router.post('/createJohnDoe', async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (email === "" || email === undefined) {
            res.status(400).json(
                {
                    error: "Please provide an email.",
                    status: 400,
                    statusText: "Bad Request"

                }
            );
            return;
        }


        const jwtPayload = { email: email, password: "password" };

        const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRATION_TIME as string });

        const user = await createUserFn({
            email: email,
            password: "password",
            username: "JohnDoe",
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "1234567890",
            bio: "I am John Doe",
        });
        console.log({ user, jwtToken });
        res.status(201).json({ user, jwtToken });
    }
    catch (error: any) {
        console.log(error);
    }
});

// update a user
router.put('/updateUser', async (req: Request, res: Response) => {
    try {
        const { email, username, firstName, lastName, phoneNumber, bio } = req.body;
        const user = await prisma.user.update({
            where: {
                email,
            },
            data: {
                username,
                firstName,
                lastName,
                phoneNumber,
                bio,
            },
        });

        res.status(200).json(user);
    } catch (error: any) {
        console.log(error);
    }
});

// delete a user
router.delete('/deleteUser', async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await prisma.user.delete({
            where: {
                email,
            },
        });

        res.status(200).json(user);
    } catch (error: any) {
        console.log(error);
    }
});

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

// get a user by id
router.get('/getUserById', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        res.status(200).json(user);
    } catch (error: any) {
        console.log(error);
    }
});

// delete john doe
router.delete('/deleteJohnDoe', async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const user = await prisma.user.delete({
            where: {
                email: email,
            },
        });

        res.status(200).json(user);
    }
    catch (error: any) {
        console.log(error);
    }
}
);
