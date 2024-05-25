import { auth, db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import type { IUser } from '@/types/user'
import type { FormCreateUser } from '@/types/user'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export class User {
  public async create(user: FormCreateUser) {
    const { email, name, password, role } = user

    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

    const uid = userCredentials.user.uid

    const docRef = doc(db, 'users', uid)

    const data: IUser = {
      uid,
      name: name,
      role: role,
      email: email,
      status: 'ACTIVE',
      firstTimeToEnter: true
    }

    await setDoc(docRef, data)

    return data
  }
}
