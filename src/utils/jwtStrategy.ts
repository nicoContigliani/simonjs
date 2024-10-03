import Jwt from '@hapi/jwt';
import { AppDataSource } from "../ormconfig";

// Servicio para validar el token
export const validateToken = async (artifacts: any, request: any, h: any) => {
    const { email } = artifacts.decoded.payload;

    // Obtener repositorio de la entidad User
    const UserEntity = await import('../entities/User');
    const userRepository = AppDataSource.getRepository(UserEntity.User);

    // Buscar el usuario en la base de datos
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
        return { isValid: false }; // El token no es válido si no se encuentra el usuario
    }

    return { isValid: true, credentials: { user } }; // Token válido si el usuario existe
};

// Configuración del plugin JWT
export const registerJwtStrategy = (server: any) => {
    // Definir la estrategia de autenticación JWT
    server.auth.strategy('jwt', 'jwt', {
        keys: `${process.env.JWT_SECRET}`, // Clave secreta para verificar el token
        verify: {
            aud: false,
            iss: false,
            sub: false,
            nbf: true,
            exp: true, // Verifica la expiración del token
        },
        validate: validateToken, // Lógica para validar el token
    });

    // Establecer 'jwt' como estrategia predeterminada para todas las rutas
    server.auth.default('jwt');
};