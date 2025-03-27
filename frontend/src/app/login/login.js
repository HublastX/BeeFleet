"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCarregando(true);
        setErro(null);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/managers/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok && data.token) {
                // Armazena o token no localStorage (ou cookies)
                localStorage.setItem("token", data.token);

                // Redireciona para a página desejada
                router.push("/");
            } else {
                setErro(data.error || "Credenciais inválidas.");
            }
        } catch (error) {
            setErro("Erro ao fazer login. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={carregando}>
                    {carregando ? "Carregando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}
