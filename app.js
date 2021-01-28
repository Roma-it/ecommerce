const express = require ('express');
const app = express();
const path = require('path');

app.use(express.static(path.resolve(__dirname,"./public")))
app.listen(4000, () => console.log('Servidor levantado en el puerto 4000'));
app.get('/', (req,res) => res.sendFile(path.resolve(__dirname,"./views/index.html")));
app.get('/register', (req,res) => res.sendFile(path.resolve(__dirname,"./views/register.html")));
app.get('/product', (req,res) => res.sendFile(path.resolve(__dirname,"./views/productDetail.html")));


