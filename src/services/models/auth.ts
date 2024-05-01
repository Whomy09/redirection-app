import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import type { ICredentials } from '@/types/auth'

export class Auth {
  public async login({ email, password }: ICredentials) {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCredentials)
    return userCredentials
  }
}
