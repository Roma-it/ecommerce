const express = require ('express');
const app = express();
const path = require('path');
<<<<<<< HEAD
const methodOverride = require('method-override')

=======
const methodOverride =  require('method-override');
>>>>>>> 059f8f2edcba536fec454fb52be3053713d2c82b
const mainRouter = require('./routers/mainRouter');
const productsRouter = require('./routers/productsRouter');
const usersRouter = require('./routers/usersRouter');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); 


app.use(express.static(path.resolve(__dirname,"./public")))
app.listen(4000, () => console.log('Servidor levantado en el puerto 4000'));

app.set('view engine', 'ejs');

app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);


