export interface Customer {
  id: string;
  guid: string;
  isActive: boolean;
  weight: number;
  picture: string;
  name: {
    first: string,
    last: string
  };
  gender: string;
  email: string;
  phone: number;
  address: string;
  registered: string;
  packs: [];
  plan: string;
}
