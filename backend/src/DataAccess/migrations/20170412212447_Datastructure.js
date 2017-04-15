
exports.up = function(knex, Promise) {
  return knex
    .schema
    .table('session', function(table){
        table.renameColumn('friendlyName', 'name');
    });
};

exports.down = function(knex, Promise) {
  return knex
    .schema
    .dropTableIfExists('session')
    .dropTableIfExists('video');
};
