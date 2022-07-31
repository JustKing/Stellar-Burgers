export namespace order {
  export interface order {
    name: string;
    number: number;
    error?: string;
  }

  export type statusTypes = 'created' | 'pending' | 'done';

  export interface orderInList {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: statusTypes;
    updatedAt: string;
    _id: string;
  }
}
