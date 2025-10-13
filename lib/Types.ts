export type AddProps = {
  item: {
    newLabel: string;
    newCategory: string;
  };
};

export type User = {
  id: number;
  email: string;
  password?: string;
  username: string;
};

export type TaskProps = {
  task: {
    id: number;
    title: string;
    frequency: string;
    last?: string;
    due: string;
  };
};
