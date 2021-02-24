const express = require('express');
const app = express();


require('./startup/routes')(app);
require('./startup/db')();
app.get('/', (req,res)=>
{
  res.render("../views/home.ejs");
});
app.get('/album', (req,res)=>
{
  res.render("../views/album.ejs");
});
app.get('/about', (req,res)=>
{
  res.render("../views/aboutProject.ejs");
});
app.get('/contact', (req,res)=>
{
  res.render("../views/contactUs.ejs");
});
const port = process.env.PORT || 8000;
app.listen(port, () => { console.log(`Running on ${port}`) });