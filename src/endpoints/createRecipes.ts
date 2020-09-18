import {Request, Response} from 'express'
import { userInfo } from 'os';
import { RecipesDatabase } from '../data/RecipesDatabase';
import { Authenticator, USER_ROLES } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import moment from 'moment'

moment.locale('pt-br')

export const createRecipe = async (req: Request, res: Response) => {
    try {
        const recipeData = {
            title: req.body.title,
            description: req.body.description
        }
        if(!recipeData.title || !recipeData.description) {
            throw new Error('Insert all required information');  
        }
        const idGenerator = new IdGenerator()
        const id = idGenerator.generateId()

        const token = req.headers.authorization

        // const authenticator = new Authenticator()
        // const getDataUser = authenticator.getData(id)

        const recipeDatabase = new RecipesDatabase()
        await recipeDatabase.createRecipesDatabase(
            id, 
            recipeData.title, 
            recipeData.description, 
            moment("18/09/2020", "DD/MM/YYYY").format("YYYY-MM-DD"),
            "a59a9573-c8c3-4ff1-9f8d-196a3f8c097e"
            )

        res.status(200).send({
            message: "Recipe created successfuly"
        })
    }catch(error) {
        res.status(400).send({
            message: error.message
        })
    }
}