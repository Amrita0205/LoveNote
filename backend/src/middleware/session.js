import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';

const MongoStore = connectMongo(session);

export const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 3600000 } // 1 hour
});