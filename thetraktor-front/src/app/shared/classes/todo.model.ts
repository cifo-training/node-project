export class Todo {
  _id: string;
  todoid: string;
  task: string;
  type: number;
  section: number;
  registerdate: Date;
  state: string;
  description: string;
  disabled: boolean;
  todotask: [{
    _id: string;
    todotaskid: string;
    task: string;
    registerdate: Date;
    state: string;
    disabled: boolean;
  }];
}
