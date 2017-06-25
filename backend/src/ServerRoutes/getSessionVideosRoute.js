import VideoRepository from '../DataAccess/Repositories/VideoRepository';
import SessionRepository from '../DataAccess/Repositories/SessionRepository';

export default {
    path: '/session/videos/{identifier}',
    method: 'GET',
    handler: (request, reply) => {
        const { identifier } = request.params;
        const videoRepository = new VideoRepository();
        const sessionRepository = new SessionRepository();

        sessionRepository
            .getSessionBy(identifier)
            .then(sessionResult => {
                videoRepository
                    .getVideosFor(sessionResult[0].id)
                    .then(videoUrls => {
                        if (videoUrls && videoUrls.length > 0) {
                            reply(videoUrls);                    
                        } else {
                            reply('404');
                        }
                    })
                    .catch(err => {
                        reply(err);
                    });  
            })
            .catch(err => {
                reply(err);
            })
    }
}