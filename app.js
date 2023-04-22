const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors());

const api = process.env.API_URL;

//Middleware
app.use(express.json());
//app.use(bodyParser.jason());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

//Routers
const categoriesRouters = require('./routers/categories');
const productsRouters = require('./routers/products');
const usersRouters = require('./routers/users');
const ordersRouters = require('./routers/orders');

app.use(`${api}/categories`, categoriesRouters);
app.use(`${api}/products`, productsRouters);
app.use(`${api}/users`, usersRouters);
app.use(`${api}/orders`, ordersRouters);

mongoose.connect(process.env.CONNECTION_STRING,{
    dbName: 'eshop-database'
})
.then(()=>{
    console.log('Database connection is ready...')
})
.catch((err)=>{
    console.log(err);
})

//Development
/*
app.listen(3000,() => {
    console.log(api);
    console.log('server is running http://localhost:3000');
})
*/

//Production
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("Express is working on port" + port)
})