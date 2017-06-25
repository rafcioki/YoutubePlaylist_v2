import Knex from '../knex';

class SessionRepository {
    getSessions() {
        return Knex('session')
            .where({})
            .select('identifier');
    }

    getSessionBy(identifier) {
        return Knex('session')
            .where({ identifier: identifier })
            .select(); // select *
    }

    doesSessionExist(identifier) {
        return Knex('session')
            .where({ identifier: identifier })
            .select('id')
            .then(results => {
                return results && results.length > 0;
            });
    }

    getSessionPasswordRelatedFields(identifier) {
        return Knex('session')
            .where({ identifier: identifier })
            .select('passwordHash', 'passwordSalt');
    }

    createSession(session) {
        return Knex('session').insert(session);
    }
}

export default SessionRepository;