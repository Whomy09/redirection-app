import { db } from '../firebase'
import { doc, setDoc, collection, getDocs } from 'firebase/firestore'
import type { IRedirection, IRedirectionForm } from '@/types/redirection'

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
}
