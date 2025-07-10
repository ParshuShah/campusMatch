const express = require("express");
const connectDB = require("./config/database");
const app = express();
const port = 4444;
const cookieParser = require("cookie-parser");
const cors = require("cors");

const http = require("http"); // For socket.io support

require("dotenv").config();

// require("./utils/cronjob");  not need it is for the email thing

app.use(cors({
    origin: ["http://localhost:5173", "http://13.53.212.125", "https://campusmatch.vercel.app/"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["set-cookie"]
}));


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);

//Established the DB Connection...
connectDB().then(
    () => {
        console.log("Database connnection Established...");
        server.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        });
    }).catch((err) => {
        console.log("Database cannot be connected!!")
    });


