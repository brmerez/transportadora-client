import Header from "./Header";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-b min-h-screen bg-opacity-40 ">
      <Header />
      <main className="pt-6 px-[5%] md:px-[7%] lg:px-[10%] xl:px-[15%] min-h-[calc(100vh_-_61px)] ">
        {children}
      </main>
    </div>
  );
}
