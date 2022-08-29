import { Etapa } from "./Etapa";
import { Status } from "./Status";

export interface Parcel {
  id: string;
  codRastreio: string;
  origem: string;
  destino: string;
  status: Status;
  etapas: Etapa[];
}
