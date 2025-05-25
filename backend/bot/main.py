from fastapi import FastAPI
from routes import bot_routes

app = FastAPI(title="Anality API")

app.include_router(bot_routes.router)
