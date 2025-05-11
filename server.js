require("dotenv").config();
//nuestra dependencia para correr el api
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser")

const flightRoutes = require("./routes/managementFlightRoute");
const baggageRoutes = require("./routes/baggageManagementRoutes");
const airportServiceRoutes = require("./routes/airportServiceRoutes");
const passengerRoutes = require("./routes/passengerRoutes");
const personnelRoutes = require("./routes/personnelRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();

//Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))



app.use("/api/flights", flightRoutes)


app.use("/auth", authRoutes)
app.use("/api/baggage", baggageRoutes)
//app.use("/api/pedidos", pedidoRoutes)
app.use("/api/airportService", airportServiceRoutes)
app.use("/api/passenger", passengerRoutes)
app.use("/api/personnel", personnelRoutes)
app.use("/api/user", userRoutes)



const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})