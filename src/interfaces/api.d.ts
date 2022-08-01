import { profile } from './profile';
import { order } from './order';

export namespace api {
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

    export interface orders {
      success: boolean;
      orders: order.orderInList[];
      total: number;
      totalToday: number;
    }

    export namespace auth {
      export interface user {
        success: boolean;
        user: Omit<profile.user, 'token' | 'password'>;
        accessToken: string;
        refreshToken: string;
      }
      export interface reset {
        token: string;
        email: string;
      }
    }
  }

  export namespace request {
    export namespace auth {
      export interface body {
        email: string;
        password: string;
        name?: string;
      }
    }
  }
}
