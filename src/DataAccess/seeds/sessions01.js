
exports.seed = function(knex, Promise) {
  var tableName = 'session';

  var rows = [
    {
      friendlyName: 'Seed session 1',
      guid: 'cbef7970-bf70-488b-a5d4-20efcf77dd81'
    }
  ];

  return knex(tableName)
    .del()
    .then(function() {
      return knex.insert(rows).into(tableName);
    });
};
