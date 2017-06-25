import shortid from 'shortid';
import csprng from 'csprng';
import bcrypt from 'bcrypt';
import SessionRepository from '../DataAccess/Repositories/SessionRepository';

class SessionService {
    createSession(userProvidedIdentifier, password) {
        const identifier = userProvidedIdentifier || shortid.generate();

        const sessionRepository = new SessionRepository();

        return sessionRepository
                .doesSessionExist(identifier)
                .then(exists => {
                    if (exists) {
                        throw "409";
                    }

                     return this.getSaltAndHashForPassword(password)
                            .then(saltAndHash => {
                            const session = {
                                identifier: identifier,
                                passwordSalt: saltAndHash.salt,
                                passwordHash: saltAndHash.hash
                            };

                            return sessionRepository.createSession(session);
                    });
                });
    }

    getSaltAndHashForPassword(password) {
        return new Promise((resolve, reject) => {
            if (password == null) {
                resolve({
                    salt: null,
                    hash: null
                });
            }
            
            const numberOfRoundsWhenGeneratingSalt = 10;
            const salt = csprng(160, 36);
            const saltedPassword = salt + password;

            bcrypt.hash(saltedPassword,
                numberOfRoundsWhenGeneratingSalt,
                (err, hash) => {
                    if (err) {
                        reject(err);
                    }

                    resolve({
                        salt: salt,
                        hash: hash
                    });
                });
        });
    }
}

export default SessionService;