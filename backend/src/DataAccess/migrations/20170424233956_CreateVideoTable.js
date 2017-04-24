
exports.up = function(knex, Promise) {
  return knex
    .schema
    .createTable('video', videoTable => {
        videoTable.increments();

        videoTable.string('videoUrl');
        videoTable
            .integer('fk_video_session')
            .unsigned()
            .references('id')
            .inTable('session');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('video');
};
