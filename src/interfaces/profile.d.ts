export namespace profile {
  export interface user {
    name: string;
    email: string;
    token: string;
    password?: string;
  }

  export type authForm<T, A = {}> = {
    [key in T]: {
      value: string;
      error: boolean;
    } & A;
  };
}
