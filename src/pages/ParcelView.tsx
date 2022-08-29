import { useParams } from "react-router";
import { Button } from "../components/Button";
import Loading from "../components/Loading";
import Wrapper from "../components/Wrapper";
import { getRandomAddress } from "../lib/dummyGenerator";
import { httpClient } from "../lib/httpClient";
import { Etapa } from "../types/Etapa";
import { Parcel } from "../types/Parcel";
import { Status } from "../types/Status";
import useFetch from "../utils/useFetch";

interface StatusAux {
  displayText: string;
  color: string;
}

function mapStatus(status: Status): StatusAux {
  switch (status) {
    case Status.EXTRAVIADO:
      return { displayText: "Extraviado 🛑", color: "red" };
    case Status.AGUARDANDO_TRANSPORTE:
      return { displayText: "Aguardando coleta 🏣", color: "yellow" };
    case Status.EM_TRANSPORTE:
      return { displayText: "Em transporte 🚚", color: "cyan" };
    case Status.ENTREGUE:
      return { displayText: "Entregue ✅", color: "lime" };
  }
}

export default function ParcelView() {
  const { codRastreio } = useParams();
  const {
    data,
    loading,
    error,
  }: { data: Parcel; loading: boolean; error: any } = useFetch(
    `${codRastreio}`
  );

  async function doAction(action: string) {
    await httpClient.put(
      `/${codRastreio}/update`,
      JSON.stringify({
        action,
        endereco: getRandomAddress(),
      })
    );

    window.location.reload();
  }

  if (loading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  if (!data || error) {
    return (
      <Wrapper>
        <h4 className="text-3xl text-center">Não encontrado :\</h4>
      </Wrapper>
    );
  }

  const statusProps = mapStatus(data.status);

  return (
    <Wrapper>
      <div className="flex">
        {data.status === Status.AGUARDANDO_TRANSPORTE && (
          <Button onClick={() => doAction("pickup")}>Coletar</Button>
        )}
        {data.status === Status.EM_TRANSPORTE && (
          <>
            <Button onClick={() => doAction("dropoff")}>Fazer parada</Button>
            <Button onClick={() => doAction("delivered")}>Entregar</Button>
          </>
        )}
      </div>
      <div className="flex flex-col gap-4 p-4 md:mx-[5%] lg:mx-[10%] xl:mx-[15%] border-[1px] font-['Poppins'] text-xl border-[#e4e4e4] rounded-md shadow-md">
        <h1 className="text-3xl ">Remessa #{codRastreio}</h1>
        <div className="flex items-center justify-between">
          <p>🔍 Status atual:</p>
          <p
            className={`p-2 px-3 rounded-full ${`bg-${statusProps.color}-300`}`}
          >
            {mapStatus(data.status).displayText}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p>🏠 Destino:</p>
          <p>{data.destino}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>🌐 Origem:</p>
          <p>{data.origem}</p>
        </div>
        <p>🛑 Paradas</p>
        <div className="flex flex-col gap-4 p-2 bg-[#e4e4e4] rounded-sm">
          {data.etapas.map((etapa) => (
            <EtapaContainer etapa={etapa} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

function EtapaContainer({ etapa }: { etapa: Etapa }) {
  const etapaAux = mapStatus(etapa.status);
  return (
    <div className="flex flex-col gap-2 bg-white rounded-sm">
      <p className="w-full p-3 text-black bg-yellow-300">
        {etapaAux.displayText}
      </p>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p>🕜 Data:</p>
          <p>
            {new Date(etapa.timestamp).toLocaleString("pt-BR", {
              timeZone: "America/Sao_Paulo",
            })}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p>🌐 Local:</p>
          <p>{etapa.endereco}</p>
        </div>
      </div>
    </div>
  );
}
