'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const [count, setCount] = useState(7);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-bee-dark-100 dark:bg-bee-dark-800 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-red-500 dark:text-red-400">404</h1>
      <p className="text-xl mt-4 text-bee-dark-600 dark:text-bee-dark-300">Oops! Página não encontrada.</p>
      <p className="mt-2 text-sm text-bee-dark-600 dark:text-bee-dark-300">
        Você será redirecionado em <span className="font-bold text-blue-500 dark:text-blue-300">{count}</span> segundos.
      </p>
      <a
        href="/"
        className="mt-6 inline-block bg-blue-600 dark:bg-bee-dark-400 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-bee-dark-500 transition"
      >
        Voltar para a página inicial
      </a>
    </div>
  );
}
