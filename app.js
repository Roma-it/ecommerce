const express = require ('express');
const app = express();
const path = require('path');
const mainRouter = require('./routers/mainRouter');
const productRouter = require('./routers/productRouter');

app.use(express.static(path.resolve(__dirname,"./public")))
app.listen(4000, () => console.log('Servidor levantado en el puerto 4000'));

app.set('view engine', 'ejs');

app.use('/', mainRouter);
//app.use('/register', mainRouter);
//app.use('/login', mainRouter);
app.use('/product', productRouter);
//app.use('/product/cart', productRouter);


