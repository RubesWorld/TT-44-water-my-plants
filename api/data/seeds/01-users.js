exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users").then(function () {
    // Inserts seed entries
    return knex("users").insert([
      {
        username: "Ruben",
        password: "cheese",
        phoneNumber: "2099424640",
        created_at: "2021-02-28T18:46:14.640Z",
        updated_at: "2021-02-28 10:46:14.640187-08",
      },
      {
        username: "Luiza",
        password: "cheese",
        phoneNumber: "1234567891",
        created_at: "2021-02-28T18:46:14.640Z",
        updated_at: "2021-02-28 10:46:14.640187-08",
      },
      {
        username: "Will",
        password: "cheese",
        phoneNumber: "1987654321",
        created_at: "2021-02-28T18:46:14.640Z",
        updated_at: "2021-02-28 10:46:14.640187-08",
      },
      {
        username: "Emma",
        password: "cheese",
        phoneNumber: "1112131415",
        created_at: "2021-02-28T18:46:14.640Z",
        updated_at: "2021-02-28 10:46:14.640187-08",
      },
    ]);
  });
};
