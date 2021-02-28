const db = require("../data/db-config");

function find() {
  return db("plants as p")
    .select(
      "p.nickname",
      "u.username as created-by",
      "i.interval_type_name",
      "p.frequency",
      "s.species_name"
    )
    .join("users as u", "p.creator_id", "u.user_id")
    .join("intervals as i", "p.interval_id", "i.interval_id")
    .join("species as s", "p.species_id", "s.species_id");
}

function findById(id) {
  return db("plants as p")
    .select(
      "p.nickname",
      "u.username as created-by",
      "i.interval_type_name",
      "p.frequency",
      "s.species_name"
    )
    .join("users as u", "p.creator_id", "u.user_id")
    .join("intervals as i", "p.interval_id", "i.interval_id")
    .join("species as s", "p.species_id", "s.species_id")
    .where("user_id", id);
}

function insert(plant) {
  return db("plants")
    .insert(plant)
    .then((id) => {
      return findById(id);
    });
}

module.exports = {
  find,
  findById,
  insert,
};
