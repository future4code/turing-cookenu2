import { Response, Request } from 'express'
import { BaseDatabase } from '../data/BaseDatabase'
import { Authenticator } from '../services/Authenticator'
import { UserDatabase } from '../data/UserDatabase';

export const getUserData = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    
    const authenticator = new Authenticator();
    const authenticatorData = authenticator.getData(token)

    const userdatabase = new UserDatabase();
    const user = await userdatabase.getUserById(authenticatorData.id)

    if(!user){
      throw new Error("User not found")
    }

    res.status(200).send({
      user
    })

  } catch (error) {
    res.status(400).send({
      message: error.message
    })
  } finally {
    BaseDatabase.destroyConnection();
  }
}