const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findBy,
  add,
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

async function update(user, changes) {
  const userId = id;
  return db("users").where("id");
}

// function remove(user) {}
