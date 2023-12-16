const User = require("../userSchema");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password, company } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
        const passwordMatch = password === user.password
      if (passwordMatch && user.companies.includes(company)) {
        // const token = jwt.sign(
        //   { userId: user._id, userName: user.userName },
        //   "secret-key"
        // );

        res.json({userId:user._id, userName:user.userName, company:company });
      } else{
        return res.status(401).json({message: 'Invalid credentials'})
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};