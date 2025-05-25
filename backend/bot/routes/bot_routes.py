from typing import Dict

from fastapi import APIRouter, Query
from services.bot.agents.generate_questions import QuestionGenerator
from services.bot_models import botModelGemini

router = APIRouter()


@router.get("/")
def bot_response(
    question: str = Query(
        ..., description="Pergunta do usuário sobre o sistema BeeFleet"
    ),
) -> Dict:
    """
    Recebe uma pergunta do usuário e retorna uma resposta do bot sobre o sistema BeeFleet.

    Args:
        question (str): Pergunta do usuário sobre o sistema BeeFleet.

    Returns:
        Dict: Resposta do bot para a pergunta do usuário.
    """

    gemini_model = botModelGemini()

    question_generator = QuestionGenerator(llm_model=gemini_model)

    context = """
    O BeeFleet é um sistema completo de gerenciamento de frota de veículos que permite
    controlar carros, motoristas, eventos de uso e gerar relatórios detalhados.
    """

    bot_response = question_generator.generate(text=context, user_question=question)
    return bot_response
