const { UserInputError } = require('apollo-server');
const User = require('../../models/User');
const { validateRegisterInput, validateLoginInput } = require('../../utils/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign({
        id: user._id,
        email: user.email,
        username: user.username
    }, process.env.SECRET_KEY, { expiresIn: '1h' });
}

const userResolvers = {
    Query: {
        login: async (parent, { username, password }, context, info) => {
            const { valid, errors } = validateLoginInput(username, password);
            if(!valid) throw new UserInputError('Errors', {errors});
            const user = await User.findOne({username});

            if(!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', {errors});
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match) {
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', {errors});
            };

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            };
        }
    },
    Mutation: {
        register: async (parent, { registerInput: { username, email, password, confirmPassword }}, context, info) => {
            // User input validation
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if(!valid) throw new UserInputError('Errors', { errors });

            // Avoid duplicate user
            const user = await User.findOne({username});
            if(user) throw new UserInputError('Username taken', {
                errors: {
                    username: 'Username taken'
                }
            });

            // Hash password
            password = await bcrypt.hash(password, 12);
            const newUser = new User({
                username,
                password,
                email,
                createdAt: new Date().toISOString()
            });
            const res = await newUser.save();
            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
};

module.exports = userResolvers;