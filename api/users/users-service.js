module.exports = {
  isValid,
  isUpdateValid,
};

function isValid(user) {
  return Boolean(
    user.username && user.password && typeof user.password === "string"
  );
}

function isUpdateValid(words) {
  return Boolean(words.password && typeof words.password === "string");
}
