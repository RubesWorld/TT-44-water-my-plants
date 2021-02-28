const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  add,
};

function find() {
  return db("users");
}
function findById(id) {
  return db("users").where("id", id).first();
}

function add(user) {
  return db("users")
    .insert(user)
    .then(([id]) => {
      return db("users").where("user_id", id).first();
    });
}

// function remove(user) {}
