const User = require('../../models/User');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Before you have models you can always just do `await knex('table_name').del`
  await knex('users').del();

  // Reset the sequence for the id column to start from 1
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');

  // User.create(username, password, email, organization, isAdmin)
  await User.create('cool_cat', '1234', 'coolcat@example.com', 'Cat Lovers Inc.', false);
  await User.create('l33t-guy', '1234', 'l33tguy@example.com', 'Hackers United', true);
  await User.create('wowow', '1234', 'wowow@example.com', 'Dog Enthusiasts Org.', false);
};

