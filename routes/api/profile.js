const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const {check, validationResult} = require("express-validator");
const User = require('../../models/User');

// @route   GET api/profile/me 
// @desc    Get current users profile
// @access  Private
router.get('/me', auth ,async (req,res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate(
            'user', 
            ["name"]);

        if(!profile){
            return res.status(400).json({msg: "There is no profile for this user"});
        }
        res.json(profile);
    }catch (err){
        console.error(err.message)
        res.status(500).send('Server Error');
    }

});

// @route   POST api/profile
// @desc    create or update users profile
// @access  Private
router.post('/', auth, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    let myuser = await User.findOne({user : req.user.email});
    let profileFields = {};
    profileFields.user = req.user.id;
    profileFields.name = myuser.name;
    profileFields.score = 0;
    
    
    try{
        let profile = await Profile.findOne({user: req.user.id});
        if (profile) {
            // update the profile
            return res.json({msg: "Profile: " +profileFields.user + " is already exists"});
        }
        
        // create a new Profile
        profile = new Profile(profileFields);
        await profile.save();
        console.log({msg: "Created new profile: " + profileFields.name});
        res.json({profile});

    }catch (err){
        console.error(err.message)
        res.status(500).send('Server Error');
    }
});

module.exports = router;