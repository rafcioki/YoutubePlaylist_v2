
exports.seed = function(knex, Promise) {
  var tableName = 'video';

  var rows = [
    { url: 'https://www.youtube.com/watch?v=52ZXSoDjr4Y' },
    { url: 'https://www.youtube.com/watch?v=52ZXSoDjr4Y' },
    { url: 'https://www.youtube.com/watch?v=52ZXSoDjr4Y' },
    { url: 'https://www.youtube.com/watch?v=52ZXSoDjr4Y' },
    { url: 'https://www.youtube.com/watch?v=52ZXSoDjr4Y' },
    { url: 'https://www.youtube.com/watch?v=52ZXSoDjr4Y' },
    { url: 'https://www.youtube.com/watch?v=52ZXSoDjr4Y' },
    { url: 'https://www.youtube.com/watch?v=52ZXSoDjr4Y' },
    { url: 'https://www.youtube.com/watch?v=52ZXSoDjr4Y' },
    { url: 'https://www.youtube.com/watch?v=52ZXSoDjr4Y' }
  ];

  rows.forEach(row => row.fkSession = 'cbef7970-bf70-488b-a5d4-20efcf77dd81');

  return knex(tableName)
    .del()
    .then(function() {
      return knex.insert(rows).into(tableName);
    });
};
