export class Plan {
  _id: string;
  name: string;
  icon: string;
  options: [
    {
      _id: string;
      option: string;
    }
  ];
  expanded: boolean;
}
