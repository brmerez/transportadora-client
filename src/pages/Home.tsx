import { useState } from "react";
import { useNavigate } from "react-router";
import { getRandomAddress } from "../lib/dummyGenerator";
import { httpClient } from "../lib/httpClient";

export default function Home() {
  const [codRastreio, setCodRastreio] = useState("");
  const nav = useNavigate();

  async function createEncomenda() {
    let body = JSON.stringify({
      origem: getRandomAddress(),
      destino: getRandomAddress(),
    });
    const res = await httpClient.post("", body);
    let parsed = JSON.parse(res.data);
    nav(`/${parsed.codRastreio}`);
  }

  return (
    <div
      className="h-screen bg-cover flex flex-col bg-opacity-80 bg-bottom "
      style={{ backgroundImage: "url('fita-caixa.jpg')" }}
    >
      <div className="w-full flex md:justify-start bg-white/50 h-[61px] justify-center items-start px-[5%] md:px-[7%] lg:px-[10%] xl-[px-15%]">
        <div className="bg-yellow-400 mt-4 outline outline-1 outline-offset-4 px-5 py-5 flex flex-col items-center justify-center gap-4 h-[6ch] w-[8ch] text-5xl font-['Montserrat'] text-white font-light">
          <h4 className="">mojave </h4>
          <h4>courier</h4>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-4 justify-center items-start px-[5%] md:px-[7%] lg:px-[10%] xl-[px-15%]">
        <div className="bottom-9">
          <h1 className="text-6xl font-['Poppins'] font-bold text-[#333] bg-yellow-400 p-2">
            Suas entregas, com muito carinho.
          </h1>
          <br />
          <div>
            <input
              name="codRastreio"
              onChange={(e) => setCodRastreio(e.target.value)}
              value={codRastreio}
              className="h-full font-['Poppins'] p-4 mr-4"
              placeholder="Código de Rastreio"
            />
            <button
              onClick={() => codRastreio !== "" && nav(`/${codRastreio}`)}
              className="p-4 mr-4 hover:bg-yellow-200 transition-all  bg-yellow-400 text-center font-['Poppins'] rounded-sm"
            >
              Consultar
            </button>
            <button
              onClick={() => createEncomenda()}
              className="p-4 mr-4 hover:bg-green-200 transition-all bg-green-400 text-center font-['Poppins'] rounded-sm"
            >
              Criar encomenda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
