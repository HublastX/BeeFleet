def create_anality() -> str:
    """
    Cria uma nova avaliação no banco de dados.

    Args:
        db (Session): Sessão do banco de dados.
        review (ReviewCreate): Objeto contendo os dados da avaliação a ser criada.

    Returns:
        Review: Objeto de avaliação criado e salvo no banco de dados.
    """
    msg: str = "Olá, bom dia! Acesse a rota /docs para testar a API."
    return msg
