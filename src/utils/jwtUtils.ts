import Jwt from '@hapi/jwt';

// const secretKey = 'claveSecreta'; // Cambia por una clave más segura

export const generateToken = (email: any) => {
    return Jwt.token.generate(
        { email },
        { key: `${process.env.JWT_SECRET}`, algorithm: 'HS256' },
        { ttlSec: 3600 } // Expira en 1 hora
    );
};

export const jwtValidate = (users: any[] | undefined, artifacts: any, request: any, h: any) => {
    const user = users?.find(u => u.id === artifacts.decoded.payload.email);
    if (!user) {
        return { isValid: false };
    }
    return { isValid: true, credentials: { user } };
};