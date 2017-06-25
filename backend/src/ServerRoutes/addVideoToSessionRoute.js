import VideoRepository from '../DataAccess/Repositories/VideoRepository';
import SessionRepository from '../DataAccess/Repositories/SessionRepository';

export default {
    path: '/session/video',
    method: 'POST',
    config: {
        auth: {
            strategy: 'token'
        }
    },
    handler: (request, reply) => {
        const { videoUrl, sessionId } = request.payload;
        const credentials = request.auth.credentials;
        const videoRepository = new VideoRepository();
        const sessionRepository = new SessionRepository();

        if (sessionId === credentials.sessionIdentifier) {
            sessionRepository
                .getSessionBy(sessionId)
                .then(sessionResult => {
                     const newVideo = {
                        videoUrl: videoUrl,
                        fk_video_session: sessionResult[0].id
                    };

                    videoRepository
                        .add(newVideo)
                        .then(newVideoId => reply(newVideoId))
                        .catch(err => {
                            reply(err)
                        });
                    });
        } else {
            reply('unathorized');
        }
    }
}