import os
from typing import Optional

from langchain.schema.language_model import BaseLanguageModel
from langchain_google_genai import ChatGoogleGenerativeAI


class LLMBase:
    """
    Classe base para criar e gerenciar modelos de linguagem.
    """

    PROVIDERS = {
        "google": {
            "models": ["gemini-pro", "gemini-1.5-pro", "gemini-2.0-flash"],
            "class": ChatGoogleGenerativeAI,
            "env_var": "GOOGLE_API_KEY",
        }
    }

    def __init__(
        self,
        provider: str = "google",
        model: str = "gemini-2.0-flash",
        temperature: float = 0.3,
        api_key: Optional[str] = None,
    ):
        """
        Inicializa a conexão com o modelo de linguagem.

        Args:
            provider (str): Nome do provedor de LLM ("google", "openai", "anthropic")
            model (str): Nome do modelo a ser utilizado
            temperature (float): Temperatura para geração (valores mais baixos = mais determinístico)
            api_key (str, opcional): Chave de API para o provedor. Se não fornecida, tentará usar variável de ambiente.
        """
        self._validate_provider_model(provider, model)

        if api_key:
            os.environ[self.PROVIDERS[provider]["env_var"]] = api_key
        elif not os.getenv(self.PROVIDERS[provider]["env_var"]):
            raise ValueError(
                f"API key não fornecida e variável de ambiente {self.PROVIDERS[provider]['env_var']} não encontrada."
            )

        self.llm = self._create_model(provider, model, temperature)
        self.provider = provider
        self.model = model

    def _validate_provider_model(self, provider: str, model: str) -> None:
        """
        Valida se o provedor e modelo existem e são compatíveis.

        Args:
            provider (str): Nome do provedor
            model (str): Nome do modelo
        """
        if provider not in self.PROVIDERS:
            available_providers = ", ".join(self.PROVIDERS.keys())
            raise ValueError(
                f"Provedor '{provider}' não suportado. Use um dos seguintes: {available_providers}"
            )

        if model not in self.PROVIDERS[provider]["models"]:
            available_models = ", ".join(self.PROVIDERS[provider]["models"])
            raise ValueError(
                f"Modelo '{model}' não disponível para o provedor '{provider}'. Use um dos seguintes: {available_models}"
            )

    def _create_model(
        self, provider: str, model: str, temperature: float
    ) -> BaseLanguageModel:
        """
        Cria a instância do modelo com base no provedor e modelo selecionados.
        """
        model_class = self.PROVIDERS[provider]["class"]

        if provider == "google":
            return model_class(model=model, temperature=temperature)
        else:
            raise ValueError(
                f"Configuração para provedor '{provider}' não implementada."
            )

    def change_model(
        self,
        provider: str,
        model: str,
        temperature: float = 0.3,
        api_key: Optional[str] = None,
    ) -> None:
        """
        Altera o modelo e provedor utilizados.

        Args:
            provider (str): Nome do provedor de LLM
            model (str): Nome do modelo a ser utilizado
            temperature (float): Temperatura para geração
            api_key (str, opcional): Chave de API para o provedor
        """
        self._validate_provider_model(provider, model)

        if api_key:
            os.environ[self.PROVIDERS[provider]["env_var"]] = api_key

        self.llm = self._create_model(provider, model, temperature)
        self.provider = provider
        self.model = model

    def get_model(self) -> BaseLanguageModel:
        """
        Retorna a instância do modelo LLM.

        Returns:
            BaseLanguageModel: Instância do modelo de linguagem
        """
        return self.llm
