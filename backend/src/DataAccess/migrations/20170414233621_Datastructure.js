
exports.up = function(knex, Promise) {
  return knex
    .schema
    .alterTable('video', function(videoTable) {
        videoTable.string('fkSession').references('guid').inTable('session').alter();
    });
};

exports.down = function(knex, Promise) {
  return knex
    .schema
    .dropTableIfExists('session')
    .dropTableIfExists('video');
};
