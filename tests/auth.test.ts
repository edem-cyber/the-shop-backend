import { PrismaClient } from "@prisma/client";
import { createUserFn } from "../routes/auth";


const prisma = new PrismaClient();

describe('createUser', () => {
    afterEach(async () => {
        // Clean up the database after each test
        await prisma.user.deleteMany();
    });

    it('should create a new user', async () => {
        // Arrange
        const email = 'test@example.com';
        const password = 'password';
        const username = 'testuser';
        const firstName = 'John';
        const lastName = 'Doe';
        const phoneNumber = '1234567890';
        const bio = 'Test user';

        // Act
        await createUserFn({ email, password, username, firstName, lastName, phoneNumber, bio });

        // Assert
        const createdUser = await prisma.user.findUnique({ where: { email } });
        expect(createdUser).toBeDefined();
        expect(createdUser?.email).toBe(email);
        expect(createdUser?.username).toBe(username);
        expect(createdUser?.firstName).toBe(firstName);
        expect(createdUser?.lastName).toBe(lastName);
        expect(createdUser?.phoneNumber).toBe(phoneNumber);
        expect(createdUser?.bio).toBe(bio);
    });
}); it('should find a unique user by email', async () => {
    // Arrange
    const email = 'test@example.com';

    // Act
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    // Assert
    expect(user).toBeDefined();
    expect(user?.email).toBe(email);
});