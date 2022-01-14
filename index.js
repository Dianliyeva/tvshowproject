//import my database, DataTypes, Model
const {sequelize, DataTypes, Model} = require('./db')

//create a child class
class User extends Model {}
class Show extends Model {}

//.init <- create a table 'model'
User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
},
{
    sequelize,
    timestamps: false,
})
Show.init({
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    rating: DataTypes.STRING,
    status: DataTypes.STRING,
},{
    sequelize,
    timestamps: false,

})
//create association
Show.belongsTo(User)
User.hasMany(Show)

//export this model
module.exports = {User,Show} 