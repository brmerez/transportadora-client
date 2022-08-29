import Wrapper from "../components/Wrapper";
import { Parcel } from "../types/Parcel";
import useFetch from "../utils/useFetch";

export default function ListParcels() {
  const { data, loading, error } = useFetch("");

  return loading ? (
    <Wrapper>
      <h4>Carregando...</h4>
    </Wrapper>
  ) : (
    <Wrapper>
      {data?.map((parcel: Parcel) => (
        <div
          className="p-4 border-[1px] shadow-md border-[#e4e4e4] rounded-md bg-white"
          key={parcel.codRastreio}
        >
          <h4>Parcela {parcel.codRastreio}</h4>
          <p>Status: {parcel.status}</p>
          <p>Origem: {parcel.origem}</p>
          <p>Destinatário: {parcel.destino}</p>
        </div>
      ))}
    </Wrapper>
  );
}
