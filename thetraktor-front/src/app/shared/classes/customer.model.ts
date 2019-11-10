export class Customer {
  _id: string;
  guid: string;
  isActive: boolean;
  weight: string;
  height: string;
  birth: Date;
  name: {
    first: string;
    last: string;
  };
  gender: string;
  picture: string;
  email: string;
  phone: string;
  address: string;
  registered: Date;
  plan: {
    _id: string;
    name: string;
    icon: string;
    expanded: boolean;
    options: [
      {
        _id: string;
        option: string;
      }
    ]
  };
  packs: [
    {
      _id: string;
      pack: string;
      image: string;
      price: number;
      locked: boolean;
    }
  ];
  packList: string;
}
