exports.up = function(knex, Promise) {
  return knex
    .schema
    .createTable('video', function(videoTable) {
        videoTable.increments();

        videoTable.string('url', 256).notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex
    .schema
    .dropTableIfExists('session')
    .dropTableIfExists('video');
};