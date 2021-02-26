exports.up = async (knex) => {
  await knex.schema.createTable("users", (users) => {
    users.increments("user_id");
    users.string("username", 200).notNullable();
    users.string("password", 200).notNullable();
    users.integer("phoneNumber", 320).notNullable();
    users.timestamps(false, true);

    .createTable('plants', (plants) => {
      plants.increments('plant_id');
      plants.string('nickname').notNullable().unique()
      plants.string('species').notNullable()
      plants.string('h20Frequency').notNullable()
    })
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("users");
};
