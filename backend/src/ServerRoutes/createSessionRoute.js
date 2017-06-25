import SessionService from '../Services/SessionService';

export default {
    path: '/session',
    method: 'POST',
    handler: (request, reply) => {
        const { identifier, password } = request.payload;
        const sessionService = new SessionService();

        sessionService
            .createSession(identifier, password)
            .then(sessionId => {
                if (sessionId) {
                    reply('200');
                    return;
                }
                
                reply('500');
            })
            .catch(code => {
                reply(code);
            });
    }
};