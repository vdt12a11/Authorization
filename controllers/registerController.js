const User = require('../model/user');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    console.log("Registering user:", req.body);
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    console.log("Checking for duplicate username...");
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        console.log("Hashing password...");
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        console.log("Creating user in database...");
        //create and store the new user
        const result = await User.create({
            "username": user,
            "password": hashedPwd
        });

        console.log("User created:", result);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };