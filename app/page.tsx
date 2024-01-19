import Header from "@/components/Header";

export default async function Index() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="animate-in flex-1 flex flex-col max-w-4xl px-3">
        <Header />
      </div>
    </main>
  );
}
