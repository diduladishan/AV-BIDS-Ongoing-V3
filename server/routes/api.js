const express = require('express');
const authRouter = require('./auth.route');
const uploadRouter = require('./upload.route');
const userRouter = require('./user.route');
const memberRouter = require('./member.route');
const eventRouter = require('./event.route');

const api = express.Router();

api.use('/auth', authRouter);
api.use('/upload', uploadRouter);
api.use('/users', userRouter);
api.use('/members', memberRouter);
api.use('/events', eventRouter);

module.exports = api;
