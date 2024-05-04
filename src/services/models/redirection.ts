import { db } from '../firebase'
import type { IRedirection, IRedirectionForm } from '@/types/redirection'
import { doc, setDoc, collection, getDocs, getDoc, updateDoc } from 'firebase/firestore'

export class Redirection {
  public async create(redirectionData: IRedirectionForm) {
    const docRef = doc(db, 'redirections', redirectionData.id)
    await setDoc(docRef, {
      ...redirectionData,
      status: 'ACTIVE',
      createdAt: new Date()
    })
  }

  public async getAll() {
    const redirectionsRef = collection(db, 'redirections')
    const redirectionsSnap = await getDocs(redirectionsRef)
    return redirectionsSnap.docs.map((doc) => {
      const data = doc.data() as IRedirection
      return {
        id: doc.id,
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
    if(!docSnap.exists()) {
      throw new Error('Redirection not exist')
    }
    return { id, ...docSnap.data() } as IRedirection
  }

  public async update(id: string, data: Partial<IRedirection>) {
    const docRef = doc(db, 'redirections', id)
    await updateDoc(docRef, { ...data })
  }

}
