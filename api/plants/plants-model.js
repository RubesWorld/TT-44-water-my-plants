const { KnexTimeoutError } = require("knex/lib/util/timeout");
const knexfile = require("../../knexfile");
const db = require("../data/db-config");
const Species = require("../species/species-model");

function find() {
  return db("plants as p")
    .select(
      "p.nickname",
      "u.username as created-by",
      "i.interval_type_name",
      "p.frequency",
      "s.species_name",
      "p.plant_id",
      "p.date",
      "p.time",
      "p.image"
    )
    .join("users as u", "p.creator_id", "u.user_id")
    .join("intervals as i", "p.interval_id", "i.interval_id")
    .join("species as s", "p.species_id", "s.species_id");
}

function findByPlantId(id) {
  return db("plants as p")
    .select(
      "p.plant_id",
      "p.nickname",
      "u.username as created-by",
      "i.interval_type_name",
      "p.frequency",
      "s.species_name",
      "p.date",
      "p.time",
      "p.image"
    )
    .join("users as u", "p.creator_id", "u.user_id")
    .join("intervals as i", "p.interval_id", "i.interval_id")
    .join("species as s", "p.species_id", "s.species_id")
    .where("plant_id", id);
}

function findAllUsersPlants(id) {
  return db("plants as p")
    .select(
      "p.nickname",
      "u.username as created-by",
      "i.interval_type_name",
      "p.frequency",
      "s.species_name",
      "p.plant_id",
      "p.date",
      "p.time",
      "p.image"
    )
    .join("users as u", "p.creator_id", "u.user_id")
    .join("intervals as i", "p.interval_id", "i.interval_id")
    .join("species as s", "p.species_id", "s.species_id")
    .where("user_id", id);
}

// function findUsersPlantById() {

// }

// function insertPlant({
//   creator_id,
//   species_id,
//   species_name,
//   nickname,
//   frequency,
//   interval_id,
//   date,
//   time,
//   image
// }) {
//   const [id] = Plants.insert(species_name,"species_")
// }

// function insert({
//   creator_id,
//   species_id,
//   species_name,
//   nickname,
//   frequency,
//   interval_id,
//   date,
//   time,
//   image,
// }) {
//   db.transactions((trx) => {
//     let newlyPlantedId;
//     if (species_name) {
//       let species_idToUse;
//       return trx("species")
//         .insert({ species_name }, "species_id")
//         .then(([id]) => {
//           species_idToUse = id;
//         });
//     } else {
//     }
//   });
// }

//*Using Transaction
async function insert({
  creator_id,
  species_id,
  species_name,
  nickname,
  frequency,
  interval_id,
  date,
  time,
  image,
}) {
  try {
    let newlyPlantedId;
    await db.transaction(async (trx) => {
      let species_idToUse;
      if (species_name) {
        const [id] = await trx("species").insert(
          { species_name },
          "species_id"
        );
        species_idToUse = id;
      } else {
        species_idToUse = species_id;
      }

      const [id] = await trx("plants").insert(
        {
          creator_id,
          species_id: species_idToUse,
          nickname,
          frequency,
          interval_id,
          date,
          time,
          image,
        },
        "plant_id"
      );
      newlyPlantedId = id;
    });
    return findByPlantId(newlyPlantedId);
  } catch (err) {
    console.log("Error on insert:", err.message);
    // Promise.reject(err);
  }
}

// function update(id,changes){
// }

// async function update(id, changes) {}

function remove(id) {
  return db("plants").where("plant_id", id).del();
}

module.exports = {
  find,
  findByPlantId,
  insert,
  remove,
  findAllUsersPlants,
};
