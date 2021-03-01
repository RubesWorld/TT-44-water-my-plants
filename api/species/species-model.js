const db = require("../data/db-config");

function find() {
  return db("species");
}

module.exports = {
  find,
};
