const User = require("../userSchema");

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
      const newUser = new User({
        userName,
        address,
        mobileNumber,
        email,
        password,
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
      user.userName = userName;
      user.address = address;
      user.mobileNumber = mobileNumber;
      user.email = email;
      user.companies = companies;
      user.password = password

      const updatedUser = await user.save();
      res.json(updatedUser);
    }
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