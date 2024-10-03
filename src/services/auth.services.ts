import { Server } from '@hapi/hapi';
import { AppDataSource } from "../ormconfig";
import { generateToken } from '../utils/jwtUtils';
import * as bcrypt from 'bcrypt';
import Joi from 'joi';

// Define interfaces for requests
interface LoginRequest {
    firstName: string;
    password: string;
    email: string;
}

interface RegisterRequest {
    email?: string;
    password?: string | number | any;
    firstName?: string;
    lastName?: string;
    age?: number;
}

const entities = async (model: string) => {
    const { [model]: Entity } = await import(`../entities/${model}`);
    return Entity;
};

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    age: Joi.number().integer().min(18).required(),
}).label('Register Model');;

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}).label('Login Model');

// Auth service
const authService = (server: Server) => {
    // Register route
    server.route({
        method: 'POST',
        path: '/register',
        handler: async (request, h) => {
            try {
                const { email, password, firstName, lastName, age } = request.payload as RegisterRequest;

                // Early return for missing fields
                if (!email || !password || !firstName || !lastName || !age) {
                    return h.response({ message: 'All fields are required.' }).code(400);
                }

                const Entity = await entities('User');
                const repository = AppDataSource.getRepository(Entity);

                // Check if user already exists
                const existingUser = await repository.findOne({ where: { email } });

                if (existingUser) {
                    return h.response({ message: 'User already exists.' }).code(400);
                }

                // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Prepare user data
                const newUser = repository.create({
                    email,
                    password: hashedPassword,
                    firstName,
                    lastName,
                    age,
                });

                // Save the new user
                await repository.save(newUser);

                // Generate JWT token
                const token = generateToken(email);

                return h.response({ message: 'User registered successfully.', token }).code(201);
            } catch (error) {
                console.error('Error registering user:', error);
                return h.response({ message: 'User registration failed.' }).code(500);
            }
        },
        options: {
            auth: false,
            validate: {
                payload: registerSchema, // Validación con Joi
                failAction: (request: any, h: any, err: any) => {
                    return h.response({ message: err.details[0].message }).code(400).takeover();
                }
            },
            tags: ['api', 'Auth'],
            description: 'Register a new user',
        }
    });

    // Login route
    server.route({
        method: 'POST',
        path: '/login',
        handler: async (request, h) => {
            try {
                const { email, password } = request.payload as LoginRequest;

                // Early return for missing fields
                if (!email || !password) {
                    return h.response({ message: 'Email and password are required.' }).code(400);
                }

                const Entity = await entities('User');
                const repository = AppDataSource.getRepository(Entity);

                // Check if user exists
                const user = await repository.findOne({ where: { email } });

                if (!user) {
                    return h.response({ message: 'User not found.' }).code(404);
                }

                // Compare passwords
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return h.response({ message: 'Invalid email or password.' }).code(401);
                }

                // Generate JWT token
                const token = generateToken(user.email);

                return h.response({ message: 'Login successful.', token }).code(200);
            } catch (error) {
                console.error('Error during login:', error);
                return h.response({ message: 'Login failed.' }).code(500);
            }
        },
        options: {
            auth: false,
            validate: {
                payload: loginSchema, // Validación con Joi
                failAction: (request: any, h: any, err: any) => {
                    return h.response({ message: err.details[0].message }).code(400).takeover();
                }
            },
            tags: ['api', 'Auth Login Model'], // Esto se mostrará en Swagger
            description: 'Obtiene un modelo específico o todos',
        }
    });
};

export default authService;
