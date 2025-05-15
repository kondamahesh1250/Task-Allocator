const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/userSchema');
require('dotenv').config;

const register = async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ msg: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userSchema({
        username,
        email,
        password: hashedPassword
    });
    await user.save();
    res.json({ message: 'User created successfully' });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
}

const verifyuser = async (req, res) => {
    try {
        const user = await userSchema.findById(req.user.id).select('username email')
        if (!user) return res.status(404).send({ message: "User not found" });
        res.status(200).send({ user });
    } catch (error) {
        res.status(400).send({ message: "Error getting user", error: error.message });
    }
};

module.exports = { register, login, verifyuser };