import { PrismaClient, } from "@prisma/client";
import { Request, Response, Router, ErrorRequestHandler } from "express";
import bcrypt from "bcrypt";
// import jwt 
import jwt from "jsonwebtoken";
import { CreateuserProps } from "../types/createuserprops";
// import joi 
import Joi from "joi";
import createHttpError from "http-errors";
import { createResponse } from "../utils/helper";
import { stat } from "fs";




const prisma = new PrismaClient();

const router = Router();
module.exports = router;

const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    username: Joi.string().min(3).required(),
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    phoneNumber: Joi.string().min(10).required(),
    bio: Joi.string().min(3).required(),
});

const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});



// export const createUserFn = async (
//     email: string,
//     password: string,
//     username: string,
//     firstName: string,
//     lastName: string,
//     phoneNumber: string,
//     bio: string
// ) => {
//     // const { email, password, username, firstName, lastName, phoneNumber, bio } = props;
//     try {
//         // check if username or email is already in use
//         const identicalEmailAccount = await prisma.user.findFirst({ where: { email } });
//         const identicalUsernameAccount = await prisma.user.findFirst({ where: { username } });

//         if (identicalEmailAccount?.email === email) {
//             createHttpError(409, "Email already exists.");
//             return;
//         } else if (identicalUsernameAccount?.username === username) {
//             createHttpError(409, "Username already exists.");
//             return;
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         if (!hashedPassword) {
//             createHttpError(500, "Internal Server Error");
//             return;
//         }
//         console.log(`EMAIL IS: ${email}`);
//         console.log(`PASSWORD IS: ${password}`);
//         console.log(`USERNAME IS: ${username}`);
//         console.log(`FIRST NAME IS: ${firstName}`);
//         console.log(`LAST NAME IS: ${lastName}`);
//         console.log(`PHONE NUMBER IS: ${phoneNumber}`);
//         console.log(`BIO IS: ${bio}`);
//         console.log(`EMAIL IN USE IS: ${identicalEmailAccount?.email.toString()}`);
//         console.log(`USERNAME IN USE IS: ${identicalUsernameAccount?.username}`);
//         console.log(`HASHED PASSWORD IS: ${hashedPassword}`);

//         const user = await prisma.user.create({
//             data: {
//                 email,
//                 password: hashedPassword,
//                 username,
//                 firstName,
//                 lastName,
//                 phoneNumber,
//                 bio,
//             },
//         });

//         console.log(`PRISMA CREATED USER IS: ${user}`);
//         return user;

//     } catch (error: any) {
//         console.log(error);
//         createHttpError(500, "Internal Server Error");

//     } finally {
//         await prisma.$disconnect();
//     }
// };

router.post('/signUp', async (req: Request, res: Response) => {
    const { email, password, username, firstName, lastName, phoneNumber, bio } = req.body;
    try {
        if (signUpSchema.validate(req.body).error) {
            createResponse(
                {
                    res: res,
                    statusCode: 400,
                    statusText: "BAD REQUEST",
                    message: "Invalid data.",
                    data: { error: `Invalid data: ${signUpSchema.validate(req.body).error}` },
                }
            );
            return;
        }
        // console.log(`EMAIL IS: ${email}`);
        // console.log(`PASSWORD IS: ${password}`);
        // console.log(`USERNAME IS: ${username}`);
        // console.log(`FIRST NAME IS: ${firstName}`);
        // console.log(`LAST NAME IS: ${lastName}`);
        // console.log(`PHONE NUMBER IS: ${phoneNumber}`);
        // console.log(`BIO IS: ${bio}`);
        // console.log(`USER IS: ${user}`)
        // console.log(`USER IS: ${user}`);

        // check if username or email is already in use
        const identicalEmailAccount = await prisma.user.findFirst({ where: { email } });
        const identicalUsernameAccount = await prisma.user.findFirst({ where: { username } });

        if (identicalEmailAccount?.email === email) {
            createResponse(
                {
                    res: res,
                    statusCode: 409,
                    statusText: "CONFLICT",
                    message: "Email already exists.",
                    data: { error: "Email already exists." },
                }
            );
            return;
        } else if (identicalUsernameAccount?.username === username) {
            createResponse(
                {
                    res: res,
                    statusCode: 409,
                    statusText: "CONFLICT",
                    message: "Username already exists.",
                    data: { error: "Username already exists." },
                }
            );
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            createResponse(
                {
                    res: res,
                    statusCode: 500,
                    statusText: "Internal Server Error",
                    message: "Internal Server Error.",
                    data: { error: "Internal Server Error." },
                }
            );
            return;
        }
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
        const payload = { email: email, password: password };
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRATION_TIME as string });
        createResponse(
            {
                res: res,
                statusCode: 201,
                statusText: "CREATED",
                message: "User created.",
                data: { user, jwtToken },
            }
        );
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

        if (signInSchema.validate(req.body).error) {
            createResponse(
                {
                    res: res,
                    statusCode: 400,
                    statusText: "BAD REQUEST",
                    message: "Invalid data.",
                    data: { error: `Invalid data: ${signInSchema.validate(req.body).error}` },
                }
            );
            return;
        }

        if (!user) {
            createResponse(
                {
                    res: res,
                    statusCode: 401,
                    statusText: "UNAUTHORIZED",
                    message: "User does not exist.",
                    data: { error: "Invalid credentials." },
                }
            );
            return;
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            createResponse(
                {
                    res: res,
                    statusCode: 401,
                    statusText: "UNAUTHORIZED",
                    message: "Invalid password.",
                    data: { error: "Invalid password." },
                }
            );
            return;
        }


        const payload = { email: email, password: password };

        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRATION_TIME as string });



        createResponse(
            {
                res: res,
                statusCode: 200,
                statusText: "OK",
                message: "User signed in.",
                data: { user, jwtToken },
            }
        );
    } catch (error: any) {
        console.log(error);
    }
}
);

router.post('/signOut', async (req: Request, res: Response) => {
    try {
        res.status(200).json(
            {
                message: "You have been signed out.",
                status: 200,
                statusText: "OK"
            }
        );
    } catch (error: any) {
        createResponse(
            {
                res: res,
                statusCode: 500,
                statusText: "Internal Server Error",
                message: "Internal Server Error.",
                data: { error: `Internal Server Error: ${error}` },
            }
        );
        console.log(error);
    }
});

// get all users
router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();

        const count = await prisma.user.count();
        // take out password from the response by using spread operator

        const usersObjectWithoutPassword = users.map(({ password, ...rest }) => rest);


        createResponse(
            {
                res,
                statusCode: 200,
                statusText: 'OK',
                message: 'User found',
                data: {
                    count,
                    users: usersObjectWithoutPassword
                },
            }
        );


    } catch (error: any) {
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

        // res.status(200).json(user);
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


// wipe out the database
router.delete('/', async (req: Request, res: Response) => {
    try {
        // count the number of users
        const userCount = await prisma.user.count();
        // if there are no users, return a 404
        if (userCount === 0) {
            res.status(404).json(
                {
                    error: "No users found.",
                    status: 404,
                    statusText: "Not Found"
                }
            );
            return;
        }
        // delete all users
        const users = await prisma.user.deleteMany();
        prisma.address.deleteMany();
        prisma.favourite.deleteMany();
        res.status(200).json({
            message: "All users have been deleted.",
            status: 200,
            statusText: "OK",
            users: users,
            userCount: userCount
        });
    } catch (error: any) {
        console.log(error);
    }
});


