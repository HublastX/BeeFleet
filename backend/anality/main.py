from fastapi import FastAPI
from routes import user_routes

app = FastAPI(title="Anality API")

app.include_router(user_routes.router)
