const e = require("express");
const User = require("../userSchema");
const crypto = require("crypto");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  const { userName, address, mobileNumber, email, password, companies } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      const salt = generateSalt()

      const hashedPassword = hashPassword(password,salt)

      const newUser = new User({
        userName,
        address,
        mobileNumber,
        email,
        password: hashedPassword,
        salt,
        companies,
      });

      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { userName, address, mobileNumber, email, password, companies } =
    req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      //   if (email) {
      //     const existingUser = await User.findOne({ email });

      //     if (existingUser) {
      //       return res.status(400).json({ message: "Email already registered" });
      //     }
      //   }
      //   else {
      user.userName = userName;
      user.address = address;
      user.mobileNumber = mobileNumber;
      user.email = email;
      user.companies = companies;

      if (password) {
        user.salt = generateSalt()
        user.password = hashPassword(password,user.salt)
      }

      const updatedUser = await user.save();
      res.json(updatedUser);
    }
    // }
    // if (!updatedUser) {
    //   return res.status(404).json({ message: "User not found" });
    // } else {
    //   return res.json(updatedUser);
    // }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.json({ message: "User Deleted Successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

function hashPassword(password, salt) {
  return crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");
}
