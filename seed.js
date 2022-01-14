//import dependencies that will help me parse my json file
const path = require('path')
const fs = require('fs').promises //will help me resolve and or reject promises as we use sequelize methods

//import our database
const {sequelize} = require('./db')
//import our model
const {User, Show} = require('./index')

//All sequelize methods return promises -> 

//define our seed function
const seed = async () => {
    //clear out our tables -> prevents us from making duplicates
    await sequelize.sync({force: true})

    //find our .json file -> parse the data -> JS OBJECT -> Access the array -> create a new row with each element of the array
    const seedPath = path.join(__dirname, 'user.json') 
    const seedPath2 = path.join(__dirname, 'show.json') 

    const buffer = await fs.readFile(seedPath) //reads information that lives in that path
    const {user} = JSON.parse(String(buffer)) // convert the JSON string Object -> JS Object
    
    const buffer2 = await fs.readFile(seedPath2) //reads information that lives in that path
    const {show} = JSON.parse(String(buffer2)) // convert the JSON string Object -> JS Object



    //1. iterate through our array
    //2. Sequelize method : Model.create(row)
    //3. resolve/reject .all [Promise<pending>,Promise<pending>,Promise<pending>...]
    const userPromises = user.map(user => User.create(user))
    const showPromises = show.map(show => Show.create(show))

    await Promise.all(userPromises) //The Promise.all() method takes in an iterable of promises as an input, and returns a single Promise that resolves or rejects
    await Promise.all(showPromises) //The Promise.all() method takes in an iterable of promises as an input, and returns a single Promise that resolves or rejects

    console.log(`All of our User and Shows have been successfully populated into our database!`)

    const diana = await User.findByPk(1)
    const backyardigans = await Show.findByPk(1)
    diana.addShow(backyardigans)

    const alex = await User.findByPk(2)
    const cyberchase = await Show.findByPk(2)
    alex.addShow(cyberchase)

    const aida = await User.findByPk(3)
    const icarly = await Show.findByPk(3)
    aida.addShow(icarly)

    const ben = await User.findByPk(4)
    const office = await Show.findByPk(4)
    ben.addShow(office)

    const saida = await User.findByPk(5)
    const sherlock = await Show.findByPk(5)
    saida.addShow(sherlock)

    const john = await User.findByPk(6)
    const FOP = await Show.findByPk(6)
    john.addShow(FOP)

    const jane = await User.findByPk(7)
    const clifford = await Show.findByPk(7)
    jane.addShow(clifford)

    const belle = await User.findByPk(8)
    const wpets = await Show.findByPk(8)
    belle.addShow(wpets)

    const rose = await User.findByPk(9)
    const dragontales = await Show.findByPk(9)
    rose.addShow(dragontales)

    const dave = await User.findByPk(10)
    const knd = await Show.findByPk(10)
    dave.addShow(knd)

}


//export our seed function
module.exports = seed; 