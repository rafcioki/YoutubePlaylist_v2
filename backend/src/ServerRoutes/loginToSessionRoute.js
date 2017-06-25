import AuthService from '../Services/AuthService';

export default {
    path: '/session/authenticate',
    method: 'POST',
    handler: (request, reply) => {
        const { identifier, password, username } = request.payload;
        const authService = new AuthService();

        authService
            .loginToSession(identifier, password, username)
            .then(signInResult => {
                reply(signInResult);
            })
            .catch(errorCode => {
                reply(errorCode);
            })
    }
};