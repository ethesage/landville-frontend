import { Address } from './Address';

export interface Client {
  clientName: string;
  phone: string;
  email: string;
  address: Address;
  id: Number;
}

export interface ClientCompany {
  data: ClientResponse;
}

export interface ClientResponse {
  client_companies: Client[];
  message: string;
}
