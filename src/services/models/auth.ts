import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import type { ICredentials } from '@/types/auth'

type LoginResponse = {
  uid: string,
  accessToken: string
}

export class Auth {
  public async login({ email, password }: ICredentials): Promise<LoginResponse> {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    const { uid, accessToken } = user as any
    return {
      uid,
      accessToken
    }
  }
}
