const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, handlerError } = require("./middlewares/erroHandller");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user/userRoutes");
const app = express();
// aqui eu to decidindo qual porta vou usar no servidor/ pode ser a que eu passar no .env
// ou a porta 5000 caso nao consiga ler.
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;

dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
// Aqui e a rota inicial do app. quando eu colar http://localhost:4000/ no navegador vai aparecer.
//me ajuda muito a ter uma base
app.use("/api/user", userRoutes);

app.use(notFound);
app.use(handlerError);


app.listen(PORT, "0.0.0.0", () => {
    console.log(`O Servidor esta rodando na porta: ${PORT}`)
})