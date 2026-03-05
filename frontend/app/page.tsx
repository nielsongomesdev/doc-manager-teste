"use client";

import { useEffect, useState } from "react";
import { Document } from "@/types";

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchDocuments = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";
    fetch(`${apiUrl}/documents`)
      .then((res) => res.json())
      .then((data) => setDocuments(data))
      .catch((err) => console.error("Erro ao buscar documentos:", err));
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      alert("Por favor, preencha o título.");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";
      const res = await fetch(`${apiUrl}/documents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        setTitle("");
        setDescription("");
        fetchDocuments();
      } else {
        alert("Erro ao criar o documento.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleUpdateStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "pendente" ? "assinado" : "pendente";

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";
      const res = await fetch(`${apiUrl}/documents/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchDocuments();
      } else {
        alert("Erro ao atualizar o status.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Gerenciador de Documentos
        </h1>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4 pb-2">Novo Documento</h2>
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Título *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Descrição (opcional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none"
                placeholder="Breve resumo do documento..."
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Criar Documento
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Meus Documentos</h2>

          {documents.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Nenhum documento encontrado.
            </p>
          ) : (
            <ul className="space-y-4">
              {documents.map((doc) => (
                <li
                  key={doc.id}
                  className="border border-gray-200 p-4 rounded-md shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50"
                >
                  <div>
                    <p className="font-bold text-lg text-gray-800">
                      {doc.titulo}
                    </p>
                    {doc.descricao && (
                      <p className="text-sm text-gray-600 mt-1">
                        {doc.descricao}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      Criado em:{" "}
                      {new Date(doc.criado_em).toLocaleDateString("pt-BR")}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        doc.status === "assinado"
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                      }`}
                    >
                      {doc.status.toUpperCase()}
                    </span>

                    <button
                      onClick={() => handleUpdateStatus(doc.id, doc.status)}
                      className={`text-sm cursor-pointer hover:underline ${
                        doc.status === "pendente"
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {doc.status === "pendente"
                        ? "Assinar Documento"
                        : "Desfazer"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
