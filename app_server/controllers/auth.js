const User = require('../model/admins');
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;

const createToken = (payload) => {
  return jwt.sign(payload, SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });
};

const signup = async (req, res) => {
  console.log(req.body);
  const { first_name, surname, email, password, user_type } = req.body;

  try {
    const user = await User.create({
      first_name,
      surname,
      email,
      password,
    });

    const payload = {
      first_name: user.first_name,
      surname: user.surname,
      email: user.email,
      user_id: user._id,
    };
    const token = createToken(payload);
    res.json({ token, message: `${user.first_name} created successfully` }).status(200)


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    if (user) {
      const payload = {
        first_name: user.first_name,
        surname: user.surname,
        email: user.email,
        user_id: user._id,
        user_type: user.user_type,
      };
      const token = createToken(payload);

      res
        .json({
          token,
          message: 'Signin was successful',
        })
        .status(200);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
  signin,
};
