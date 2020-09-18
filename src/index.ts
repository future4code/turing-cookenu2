import express from "express"
import dotenv from "dotenv"
import { AddressInfo } from "net"
import { createRecipe } from "./endpoints/createRecipes"


dotenv.config()

const app = express()

app.use(express.json())

app.post('/recipe', createRecipe)

const server = app.listen(process.env.PORT || 3003, ()=> {
    if(server) {
        const address = server.address() as AddressInfo
        console.log(`Server is running in http://localhost:${address.port}`)
    } else {
        console.error(`Failure upon starting server.`)
    }
})