const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findBy,
  add,
  updateProfile,
};

function find() {
  return db("users");
}
function findById(id) {
  return db("users").where("user_id", id);
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user, "user_id");
  return findById(id);
}

function updateProfile(id, changes) {
  return db("users")
    .where("user_id", id)
    .update(changes)
    .then(() => {
      return db("users").where("user_id", id).first();
    });
}

// function remove(user) {}
