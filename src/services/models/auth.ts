import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import type { ICredential } from '@/types/auth'

export class Auth {
  public async login({email, password}: ICredential) {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password) 
      console.log(userCredentials)
      return userCredentials
    } catch (error) {
      console.log(error)
    }
  }
}
