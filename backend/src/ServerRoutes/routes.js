import createSessionRoute from './createSessionRoute';
import loginToSessionRoute from './loginToSessionRoute';
import addVideoToSessionRoute from './addVideoToSessionRoute';
import getSessionVideosRoute from './getSessionVideosRoute';

const routes = [
    createSessionRoute,
    loginToSessionRoute,
    addVideoToSessionRoute,
    getSessionVideosRoute
];

export default routes;