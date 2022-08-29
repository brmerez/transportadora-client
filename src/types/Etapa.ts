import { Status } from "./Status";

export interface Etapa {
  id: string;
  status: Status;
  endereco: string;
  timestamp: Date;
}
