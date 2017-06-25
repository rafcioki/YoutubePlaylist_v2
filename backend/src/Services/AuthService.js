import SessionRepository from '../DataAccess/Repositories/SessionRepository';
import SecretKeys from '../../config/secretKeys';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthService {
    loginToSession(sessionIdentifier, sessionPassword, username) {
        const sessionRepository = new SessionRepository();

        return sessionRepository
                .getSessionPasswordRelatedFields(sessionIdentifier)
                .then(sessionFields => {
                    if (!sessionFields || sessionFields.length === 0) {
                        throw '404';
                    }

                    const passwordSalt = sessionFields[0].passwordSalt;
                    const passwordHash = sessionFields[0].passwordHash;
                    const saltedPassword = passwordSalt + sessionPassword;

                    return this.isSessionPasswordCorrect(saltedPassword, passwordHash)
                                .then(isSessionPasswordCorrect => {
                                    if (isSessionPasswordCorrect) {
                                        const signedToken = jwt.sign({
                                            sessionIdentifier,
                                            username
                                        },
                                        SecretKeys.jwtKey, {
                                            algorithm: 'HS256',
                                            expiresIn: '1h'
                                        });

                                        return signedToken;
                                    }

                                    throw '401';
                                });
                });
    }

    // Wrap up callback-based bcryp's compare into a promise.
    isSessionPasswordCorrect(saltedPassword, passwordHash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(saltedPassword,
                passwordHash,
                (error, isCorrect) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve(isCorrect);
                });
        });
    }
}

export default AuthService;