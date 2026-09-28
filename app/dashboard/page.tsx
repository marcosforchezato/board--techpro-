export default function Dashboard() {
  return (
    <main className="flex flex-col min-h-screen px-6 py-8">
      <div className="flex flex-col gap-2 mb-8">
        <div className="h-7 w-48 rounded-md bg-white/5" />
        <div className="h-4 w-72 rounded-md bg-white/5" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl bg-white/5 border border-white/10 p-5 h-24"
          />
        ))}
      </div>

      <div className="rounded-xl bg-white/5 border border-white/10 p-6 flex-1 min-h-[320px]" />
    </main>
  );
}
