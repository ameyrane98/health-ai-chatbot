from fastapi import APIRouter
from pydantic import BaseModel
from services.agent_core import get_bot_response



router = APIRouter()

class ChatMessage(BaseModel):
    user_input: str

@router.post("/chat")
async def chat_endpoint(message: ChatMessage):
    response = get_bot_response(message.user_input)
    return {"response": response}