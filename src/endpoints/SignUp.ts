import { Response, Request } from 'express'
import { IdGenerator } from '../services/IdGenerator'
import { HashManager } from '../services/HashManager'
import { UserDatabase } from '../data/UserDatabase'
import { Authenticator } from '../services/Authenticator'
import { BaseDatabase } from '../data/baseDatabase'

export const signUp = async (req: Request, res: Response) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    if(!userData.name || !userData.email || !userData.password){
      throw new Error("Insert all required information")
    }

    const idgenerator = new IdGenerator();
    const id = idgenerator.generateId();

    const hashmanager = new HashManager();
    const hash = await hashmanager.hash(userData.password);

    const userdatabase = new UserDatabase();
    await userdatabase.createUser(id, userData.name, userData.email, hash);

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({
      id
    });

    res.status(200).send({
      message: "User created successfully",
      token
    })

  } catch (error) {
    res.status(400).send({
      message: error.message
    })
  } finally {
    BaseDatabase.destroyConnection()
  }
}