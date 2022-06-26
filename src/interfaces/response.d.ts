export namespace response {
  export interface response<T> {
    success: boolean;
    data: T;
  }
  export interface order {
    name: string;
    order: {
      number: number;
    };
    success: boolean;
  }

  export namespace auth {
    export interface body {
      email: string;
      password: string;
      name?: string;
    }
    export interface request {
      success: boolean;
      user: user;
      accessToken: string;
      refreshToken: string;
    }

    export interface user {
      email: string;
      name: string;
    }

    export interface reset {
      token: string;
      email: string;
    }
  }
}
