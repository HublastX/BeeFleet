from http import HTTPStatus
from typing import Dict

from controllers.user_controller import create_anality
from fastapi import APIRouter

router = APIRouter(prefix="/anality", tags=["anality_user"])


@router.get("/", status_code=HTTPStatus.OK)
def read_root() -> Dict:
    """
    Retorna uma lista de reviews das avaliação.

    Args:
        skip (int): Número de reviews a pular (padrão: 0).
        limit (int): Número máximo de reviews a retornar (padrão: 10).
        db (Session): Sessão do banco de dados (dependência).

    Returns:
        List[ReviewResponse]: Lista de reviews.



    """

    messagem: str = create_anality()

    return {"message": messagem}
