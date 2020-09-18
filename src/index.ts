import express from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { signUp } from "./endpoints/SignUp";
import { login } from "./endpoints/Login";
import { getUserData } from "./endpoints/GetUserData";

dotenv.config();

const app = express();
app.use(express.json());

app.post('/user/signup', signUp)
app.post('/user/login', login)
app.get('/user', getUserData)

const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});