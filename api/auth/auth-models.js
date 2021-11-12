const db = require("../../data/dbConfig");

function findById(id) {
  return db("users").where("id", id).first();
}

function findByFilter(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

module.exports = {
  add,
  findByFilter,
};
