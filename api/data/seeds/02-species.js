exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("species").then(function () {
    // Inserts seed entries
    return knex("species").insert([
      {
        species_name: "Cardiopteridaceae",
      },
      {
        species_name: "Burmanniaceae",
      },
      {
        species_name: "Amborellaceae",
      },
      {
        species_name: "Acoraceae",
      },
      {
        species_name: "Melanthiaceae",
      },
    ]);
  });
};
