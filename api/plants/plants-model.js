const { whereNotExists } = require("../data/db-config");
const db = require("../data/db-config");
const { findBy } = require("../users/users-models");

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

async function insert({
  creator_id,
  species_id,
  species_name,
  nickname,
  frequency,
  interval_id,
}) {
  try {
    let newlyPlantedId;
    await db.transaction(async (trx) => {
      let species_idToUse;
      if (species_name) {
        const [id] = await trx("species").insert({ species_name });
        species_idToUse = id;
      } else {
        species_idToUse = species_id;
      }

      const [id] = await trx("plants").insert({
        creator_id,
        species_id: species_idToUse,
        nickname,
        frequency,
        interval_id,
      });
      newlyPlantedId = id;
    });
    return findById(newlyPlantedId);
  } catch (err) {
    console.log("Error on transaction", err.message);
    Promise.reject(err);
  }
}

function remove(id) {
  return db("plants").where("plant_id", id).del();
}

module.exports = {
  find,
  findById,
  insert,
  remove,
};
