exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("intervals").then(function () {
    // Inserts seed entries
    return knex("intervals").insert([
      {
        interval_type_name: "daily",
      },
      {
        interval_type_name: "weekly",
      },
      {
        interval_type_name: "monthly",
      },
    ]);
  });
};
