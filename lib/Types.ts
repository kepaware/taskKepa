export type Task = {
  id: number;
  title: string;
  frequency: string;
  last: string;
  due: string;
};

export type AddTask = {
  id?: number;
  newTitle: string;
  newFrequency: string;
  newLast: string;
  newDue: string;
};

export type AddProps = {
  task: AddTask;
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

type End = {
  id: number;
  newLast: string;
  newDue: string;
};

export type EndProps = {
  endUpdate: End;
};

type Update = {
  id: number;
  newTitle: string;
  newFrequency: string;
  newLast: string;
  newDue: string;
};

export type UpdateProps = {
  update: Update;
};
