import { Response, Request } from 'express'
import {RecipesDatabase} from '../data/RecipesDatabase'
import { UserDatabase } from '../data/UserDatabase'
import { Authenticator } from '../services/Authenticator'

export const getRecipes = async(req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string
        const id = req.params.id

        const authenticator = new Authenticator()
        const authenticatorData = authenticator.getData(token)

        const recipeDatabase = new RecipesDatabase()
        const recipe = await recipeDatabase.getRecipesForId(id)


        if(!recipe) {
            throw new Error("Recipe not found")
        }
        res.status(200).send({
            recipe
        })

    } catch(error) {
        res.status(400).send({
            message: error.message
        })
    } 
}