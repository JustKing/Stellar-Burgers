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
}
