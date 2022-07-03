const { ObjectId, Decimal128 } = require('mongodb');
const Router = require('express').Router;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getDB } = require('../util/db');

const router = Router();

const createToken = () => {
    return jwt.sign({}, 'secret', { expiresIn: '1h' });
};

router.post('/login', async (req, res, next) => {
    const email = req.body.email;
    const pw = req.body.password;

    let user = await getDB().collection('users').findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid login.' });
    }

    const isValid = await bcrypt.compare(pw, user.password);
    if (!isValid) {
        return res.status(400).json({ message: 'Invalid login.' });
    }
    // Check if user login is valid
    // If yes, create token and return it to client
    const token = createToken();
    // res.status(200).json({ token: token, user: { email: 'dummy@dummy.com' } });
    user.password = undefined;
    res.status(200).json({
        token,
        user,
        message: 'Successfully logged in.',
    });
});

router.post('/signup', async (req, res, next) => {
    const email = req.body.email;
    const pw = req.body.password;
    let user = await getDB().collection('users').findOne({ email });
    if (user) {
        return res.status(400).json({ message: 'User exists.' });
    }
    const password = await bcrypt.hash(pw, 12);
    user = await getDB()
        .collection('users')
        .findOneAndUpdate(
            { _id: new ObjectId() },
            { $set: { email, password } },
            { upsert: true, returnDocument: 'after' }
        )
        .then(({ value }) => value);
    const token = createToken();
    user.password = undefined;
    return res.status(201).json({
        user,
        token,
        message: 'Successfully signed up user',
    });
});

module.exports = router;
