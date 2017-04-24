exports.up = function(knex, Promise) {
  return knex
    .schema
    .createTable('session', sessionTable => {
        sessionTable.increments();

        sessionTable.string('identifier', 50).nullable().unique();
        sessionTable.string('passwordHash', 512).nullable();
        sessionTable.string('passwordSalt', 512).nullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('session');
};
