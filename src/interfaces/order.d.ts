export namespace order {
  export namespace context {
    type actions = { type: 'set'; payload: order } | { type: 'reset' } | { type: 'set-error'; payload: string };
    export interface context {
      order: order;
      orderDispatcher: Dispatch<actions>;
    }
  }

  export interface order {
    name: string;
    number: number;
    error?: string;
  }
}
