import { Response, Request } from 'express'
import { UserDatabase } from '../data/UserDatabase'
import { HashManager } from '../services/HashManager'
import { Authenticator } from '../services/Authenticator'
import { BaseDatabase } from '../data/baseDatabase'

export const login = async (req: Request, res: Response) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password
    }

    if(!userData.email || !userData.password){
      throw new Error("Insert all required information")
    }

    const userdatabase = new UserDatabase();
    const user = await userdatabase.getUserByEmail(userData.email);

    const hashmanager = new HashManager();
    const isPasswordCorrect = await hashmanager.compare(userData.password, user.password)

    if(!isPasswordCorrect){
      throw new Error("Email or password incorrect")
    }

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({
      id: user.id
    });

    res.status(200).send({
      message: "User successfully logged in",
      token
    })

  } catch (error) {
    res.status(400).send({
      message: error.message
    })
  } finally {
    BaseDatabase.destroyConnection();
  }
}