const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({ name, email, password: hashedPassword });
};

exports.loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '1d' }
    );
    return token;
};
