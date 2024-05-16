import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center text-center font-medium gap-y-2">
      <h1 className="text-4xl md:text-8xl text-primary">404</h1>
      <h2 className="text-xl">OUPS PAGE INTROUVABLE</h2>
      <p className="text-sm text-gray-800">
        la page que vous recherchez est indisponible.
        <br />
        Veuillez réessayer plus tard
      </p>
      <Link href="/AuthPage">
        <button className="px-6 h-[45px] bg-primary text-white font-medium text-lg  rounded-md">
          Accueil
        </button>
      </Link>
    </main>
  );
}
