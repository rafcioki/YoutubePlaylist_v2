import Knex from '../knex';

class VideoRepository {
     add(newVideo)  {
        return Knex('video').insert(newVideo);
    }

    getVideosFor(sessionIdentifier) {
        return Knex('video')
            .where({ fk_video_session: sessionIdentifier })
            .select('videoUrl');
    }
}

export default VideoRepository;