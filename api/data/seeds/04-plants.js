exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("plants").then(function () {
    // Inserts seed entries
    return knex("plants").insert([
      {
        nickname: "Sandra The Plant",
        frequency: 1,
        time: "3:30",
        date: "2021-03-20",
        creator_id: 1,
        species_id: 2,
        interval_id: 2,
        created_at: "2021-02-28T19:46:14.640Z",
        updated_at: "2021-02-28 20:46:14.640187-08",
      },
      {
        nickname: "Kenny The Plant",
        frequency: 1,
        time: "3:30pm",
        creator_id: 1,
        species_id: 1,
        interval_id: 3,
        created_at: "2021-02-28T19:46:14.640Z",
        updated_at: "2021-02-28 20:46:14.640187-08",
      },
      {
        nickname: "Sam The Plant",
        frequency: 1,
        time: "3:30pm",
        creator_id: 2,
        species_id: 3,
        interval_id: 2,
        created_at: "2021-02-28T19:46:14.640Z",
        updated_at: "2021-02-28 20:46:14.640187-08",
      },
    ]);
  });
};
