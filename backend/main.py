from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, chat

app = FastAPI(title="Health AI Chatbot")

# Allow any origin during development (restrict in prod)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register chat router
app.include_router(auth.router)
app.include_router(chat.router)
