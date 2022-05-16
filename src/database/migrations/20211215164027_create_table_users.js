const { onUpdateTrigger } = require("../../../knexfile");

exports.up = async knex => knex.schema.createTable('users', table => {
    table.increments('id');q
    table.text('username').unique().notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  }).then(() => knex.raw(onUpdateTrigger('users')))


exports.down = async knex => knex.schema.dropTable('users');
