const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};
const SequelizeMock = require('sequelize-mock');
const { seed } = require('../helper/seeders');

let sequelize;
if (process.env.NODE_ENV === 'test') {
    sequelize = new SequelizeMock();
} else {
    sequelize = new Sequelize(
        process.env.DB_URI,
        JSON.parse(process.env.DB_OPTIONS)
    );
}

/* sequelize
    .sync({
        force: true
    })
    .then(() => seed()); */

fs.readdirSync(__dirname)
    .filter(
        file =>
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
    )
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// eslint-disable-next-line no-console
console.log('Creating Association');
db.users.hasMany(db.bookings);

module.exports = db;
