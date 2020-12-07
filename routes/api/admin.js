const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check,validationResult} = require('express-validator');

//const User = require("../../models/Admin");
const Admin = require('../../models/Admin');

// @route   POST api/admin
// @desc    Register user
// @access  Public

router.post('/', [
  check('name', 'Name is required')
  .not()
  .isEmpty(),
  check('email',"Please incluse a valid mail").isEmail(),
  check('password','Please enter a password with 6 or more charecters').isLength({min:6})
],
async (req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  const {name, email, password} = req.body;

  try {

  // See if the User exists
    let admin = await Admin.findOne({email});

    if(admin) {
      return res.status(400).json({ errors: [{ msg: "admin already exists"}] });
    }

  admin = new Admin ({
    name,
    email,
    password
  });

  // Encrypt password

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password,salt);

  await user.save();

    // return jsonWebToken 
    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
      payload, 
      config.get("jwtSecret"),
      {expiresIn: 3600000},
      (err, token)=> {
        if (err) throw err;
        res.json({token});
      });
  }
  catch(err) {
    console.error(err.message);
    res.status(500).send('server Error');
  }
}
);

module.exports = router;