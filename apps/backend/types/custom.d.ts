interface User {
  id: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

declare namespace Express {
  export interface Request {
    user?: User;
  }
}
