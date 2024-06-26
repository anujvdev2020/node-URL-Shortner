const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

const { setUser } = require("../service/auth");
async function handleUserSignUp(req, res) {
  const { name, password, email } = req.body;

  await User.create({ name, password, email });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { password, email } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid username or password",
    });
  const token = setUser(user);
     res.cookie('token',token) 
    //  send token in response if its a valid user

  return res.redirect("/");
}

module.exports = { handleUserSignUp, handleUserLogin };
