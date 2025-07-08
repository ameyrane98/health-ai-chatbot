from fastapi import APIRouter
from models.schemas import ChatMessage 
from services.agent_core import get_bot_response



router = APIRouter()


@router.post("/chat")
async def chat_endpoint(message: ChatMessage):
    response = get_bot_response(message.user_input)
    return {"response": response}