import os
from datetime import datetime
from typing import Dict

from fastapi import APIRouter, Query
from services.bot.agents.generate_questions import QuestionGenerator
from services.bot_models import botModelGemini

router = APIRouter()


def save_question_to_file(question: str) -> None:
    """
    Salva a pergunta do usuário em um arquivo de texto.

    Args:
        question (str): Pergunta do usuário a ser salva.
    """
    log_dir = "/app/logs"

    if not os.path.exists(log_dir):
        os.makedirs(log_dir)

    log_file = os.path.join(log_dir, "user_questions.txt")

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_entry = f"[{timestamp}] {question}\n"

    with open(log_file, "a", encoding="utf-8") as f:
        f.write(log_entry)


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
    save_question_to_file(question)

    gemini_model = botModelGemini()

    question_generator = QuestionGenerator(llm_model=gemini_model)

    context = """
    O BeeFleet é um sistema completo de gerenciamento de frota de veículos que permite
    controlar carros, motoristas, eventos de uso e gerar relatórios detalhados.
    """

    bot_response = question_generator.generate(text=context, user_question=question)
    return bot_response
