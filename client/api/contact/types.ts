interface ContactBase {
  id: string;
  _id?:string;
  firstName: string;
  lastName: string;
  email: string;
  number: number;
}

export interface Contacts extends ContactBase {}

export interface NewContact extends Omit<ContactBase, 'id'> {}

export interface DeleteReponse {
  message:string;
}
