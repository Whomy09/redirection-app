import { db } from '../firebase'
import { doc, setDoc } from "firebase/firestore"; 
import type { IRedirectionForm } from '@/types/redirection'

export class Redirection {
  
  public async create(redirectionData: IRedirectionForm) {
    const docRef = doc(db, 'redirections', redirectionData.id)
    await setDoc(docRef, {
      ...redirectionData,
      status: 'ACTIVE',
      createdAt: new Date()
    })
  }
}
