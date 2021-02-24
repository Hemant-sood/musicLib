const express = require('express');
const app = express();


require('./startup/routes')(app);
require('./startup/db')();
app.get('/', (req,res)=>
{
  res.render("../views/home.ejs");
});
const port = process.env.PORT || 8000;
app.listen(port, () => { console.log(`Running on ${port}`) });