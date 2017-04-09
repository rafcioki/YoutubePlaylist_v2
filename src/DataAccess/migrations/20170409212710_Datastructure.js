exports.up = function(knex, Promise) {
  return knex
    .schema
    .createTable('session', function(sessionTable) {
        sessionTable.increments();

        sessionTable.string('friendlyName', 50).nullable().unique();
        sessionTable.string('passwordHash', 50).nullable();
        sessionTable.string('guid').notNullable().unique();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('session');
};