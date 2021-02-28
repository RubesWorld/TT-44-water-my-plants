exports.up = async (knex) => {
  await knex.schema
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 200).notNullable();
      users.string("password", 200).notNullable();
      users.integer("phoneNumber", 320).notNullable();
      users.timestamps(true, true);
    })
    .createTable("plants", (plants) => {
      plants.increments("plant_id");
      plants.string("nickname").notNullable().unique();
      plants.string("species").notNullable();
      plants.string("frequency").notNullable();
      plants
        .integer("species_id")
        .unsigned()
        .notNullable()
        .references("plant_id")
        .inTable("plants")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      plants.timestamps(true, true);
    })
    .createTable("species", (species) => {
      species.increments("species_id");
      species.string("species_name");
    })
    .createTable("intervals", (interval) => {
      interval.increments("interval_id");
      interval.string("interval_type_name");
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("users");
};
