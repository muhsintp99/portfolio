const bcrypt = require("bcryptjs");
const User = require("./models/User.model");
require("./config/db")();

(async () => {
  const hash = await bcrypt.hash("Muhsin925@", 10);
  await User.create({
    email: "muhsintp.develop@gmail.com",
    password: hash
  });
  console.log("Admin Seeded");
  process.exit();
})();