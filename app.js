const express = require('express');
const app = express();
const seed = require('./seed')
const { body, validationResult } = require('express-validator')

app.use(express.json())

const {User, Show} = require('./index');
const {sequelize} = require('./db');
const port = 3000;

app.listen(port, async() => {
    await seed()
    console.log(`Server is listening at //localhost:${port}`)
}) 

app.get('/', async (req, res) => {
  res.send('<h1>Hello!</h1>')
})

app.get('/users', async (req, res) => {
  const user = await User.findAll();
  res.json({user});
})

app.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  res.json({user})
})

app.get('/shows', async (req, res) => {
  const show = await Show.findAll();
  res.json({show});
})

app.get('/shows/:id', async (req, res) => {
  const show = await Show.findByPk(req.params.id)
  res.json({show})
})

app.get('/users/:id/shows', async (req, res) => {
  const show = await Show.findByPk(req.params.id)
  res.json({show})
})

app.post('/shows-add', async (req, res) => {
  const newShow = await Show.create(req.body);
  res.send('Created!')
})
app.get('/:genre', async (req, res) => {
  const show = await Show.findAll({
    where: {
      genre:req.params.genre
    }
  });
  res.json({show})
})

app.put('/users/:userid/shows/:showid', async (req, res) => {
  await Show.update({Userid: req.params.userid}, 
      {
          where:{id: req.params.showid}
  })
      
  
  res.send("Updated!")
})


app.put('/shows-update/:id', async (req, res) => {
  await Show.update({title:req.body.title}, {
      where: {id:req.params.id}
  })
  res.send("Updated!")
})

app.put('/shows-rate/:id', async (req, res) => {
  await Show.update({rating:req.body.rating}, {
      where: {id:req.params.id}
  })
  res.send("Updated rating!")
})

app.put('/shows-newseasons/:id', async (req, res) => {
  await Show.update({status:req.body.status}, {
      where: {id:req.params.id}
  })
  res.send("Updated seasons!")
})

app.delete('/shows/:id', async (req, res) => {
  await Show.destroy({
      where: {id: req.params.id}
  })
  res.send('Deleted!')
})

