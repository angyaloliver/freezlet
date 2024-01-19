import Header from "@/components/Header";

export default async function Index() {
  return (
    <div className="w-full flex flex-col items-center pt-28">
      <div className="animate-in flex-1 flex flex-col max-w-4xl px-3">
        <Header />
      </div>
    </div>
  );
}
