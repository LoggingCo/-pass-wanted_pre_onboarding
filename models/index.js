import Sequelize from 'sequelize';
import comapny from './company/company.js';
import empost from './employment/post.js';
import user from './user/user.js';
import apply from './employment/apply.js';

import DBconfig from '../config/config.js';

const env = process.env.NODE_ENV || 'development';
const config = DBconfig[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Company = comapny;
db.EmApply = apply;
db.EmPost = empost;
db.User = user;

Object.keys(db).forEach((modelName) => {
    db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
