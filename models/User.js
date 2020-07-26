const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        //define an id column
        id: {
            // use the special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            //this is the equivalent of SQLs NOT NULL
            allowNull: false,
            // instruct that this is the primary key
            primaryKey: true,
            // turn on auto increment
            autoIncrement: true
        },
        //define a username column
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the password must be at least foure characters long
                len: [4]
            }
        }
    },
    {
        hooks: {
            //set up beforeCreate lifecycle "hook" functionality
           async beforeCreate(newUserData) {
               newUserData.password = await bcrypt.hash(newUserData.password, 10);
               return newUserData;
           },
           //set up beforeUpdate lifecycle "hook" functionality
           async beforeUpdate(updatedUserData) {
               updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
               return updatedUserData;
           }
        },
        // table configuration options go here 
        
        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        // dont automaticall create createdAt/updatedAt timestamp fields
        timestamps: false,
        // dont pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports= User;