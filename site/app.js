require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mainRouter = require("./routers/mainRouter");
const productsRouter = require("./routers/productsRouter");
const usersRouter = require("./routers/usersRouter");
const domRouter = require("./routers/apiRoutes/domicilios");
const apiUserRouter = require("./routers/apiRoutes/users");
const apiProductosRouter = require("./routers/apiRoutes/productos");
const apiComprasRouter = require("./routers/apiRoutes/compras");
const apiPedidosRouter = require("./routers/apiRoutes/pedidos");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const isLogged = require("./middlewares/isLogged");
const haveCart = require("./middlewares/haveCart");
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
    session({
        secret: "Nuestro secreto",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(cookieParser());
app.use(isLogged);
//app.use(haveCart);
app.use(cors("*"));

app.use(express.static(path.resolve(__dirname, "./public")));
app.listen(4000, () => console.log("Servidor levantado en el puerto 4000"));

app.set("view engine", "ejs");

app.use("/", mainRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/domicilios", domRouter);
app.use("/api/users", apiUserRouter);
app.use("/api/productos", apiProductosRouter);
app.use("/api/compras", apiComprasRouter);
app.use("/api/pedidos", apiPedidosRouter);
