const User = require("../userSchema");
const jwt = require("jsonwebtoken");
// const crypto = require('crypto')

exports.login = async (req, res) => {
  const { email, password, company } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {

        // const hashedPassword = hashPassword(password,user.salt)

        const passwordMatch = password === user.password

      if (passwordMatch && user.companies.includes(company)) {
        const token = jwt.sign(
          { userId: user._id, userName: user.userName },
          "secret-key"
        );

        res.json({ token });
      } else{
        return res.status(401).json({message: 'Invalid credentials'})
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// function generateSalt() {
//     return crypto.randomBytes(16).toString("hex");
//   }
  
//   function hashPassword(password, salt) {
//     return crypto.createHash("sha256").update(password + salt).digest("hex");
//   }