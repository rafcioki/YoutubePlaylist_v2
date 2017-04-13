
exports.up = function(knex, Promise) {
  return knex
    .schema
    .alterTable('session', function(sessionTable) {
        sessionTable.string('passwordHash', 512).nullable().alter();
        sessionTable.string('passwordSalt', 512).nullable();
    });
};

exports.down = function(knex, Promise) {
  return knex
    .schema
    .dropTableIfExists('session')
    .dropTableIfExists('video');
};
