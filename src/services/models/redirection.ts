import { db } from '../firebase'
import type { IRedirection, IRedirectionForm } from '@/types/redirection'
import {
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  where,
  query
} from 'firebase/firestore'

export class Redirection {
  public async create(uid: string, redirectionData: IRedirectionForm) {
    const docRef = doc(db, 'redirections', redirectionData.id)
    const data = {
      ...redirectionData,
      uid,
      status: 'ACTIVE',
      createdAt: new Date()
    }
    await setDoc(docRef, data)
    return data
  }

  public async getAll() {
    const redirectionsRef = collection(db, 'redirections')
    const redirectionsSnap = await getDocs(redirectionsRef)
    return redirectionsSnap.docs.map((doc) => {
      const data = doc.data() as IRedirection
      return {
        id: doc.id,
        uid: data.uid,
        createdAt: data.createdAt,
        links: data.links,
        name: data.name,
        status: data.status
      }
    })
  }

  public async getById(id: string) {
    const docRef = doc(db, 'redirections', id)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      throw new Error('Redirection not exist')
    }
    return { id, ...docSnap.data() } as IRedirection
  }

  public async update(id: string, data: Partial<IRedirection>) {
    const docRef = doc(db, 'redirections', id)
    await updateDoc(docRef, { ...data })
  }

  public async getByUser(uid: string) {
    const redirectionsRef = collection(db, 'redirections')
    const q = query(redirectionsRef, where('uid', '==', uid))
    const redirectionsSnap = await getDocs(q)
    return redirectionsSnap.docs.map((doc) => {
      const data = doc.data() as IRedirection
      return {
        id: doc.id,
        uid: data.uid,
        createdAt: data.createdAt,
        links: data.links,
        name: data.name,
        status: data.status
      }
    })
  }
}
