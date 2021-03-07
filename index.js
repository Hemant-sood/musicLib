const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();

const port = process.env.PORT || 8200;
app.listen(port, () => { console.log(`Running on ${port}`) });