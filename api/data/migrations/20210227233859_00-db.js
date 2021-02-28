exports.up = async (knex) => {
  await knex.schema.createTable("users", (users) => {
    users.increments("user_id");
    users.string("username", 200).notNullable();
    users.string("password", 200).notNullable();
    users.string("phoneNumber").notNullable().unique();
    users.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists("intervals")
    .dropTableIfExists("species")
    .dropTableIfExists("plants")
    .dropTableIfExists("users");
};
