from pydantic import BaseModel


class ChatMessage(BaseModel):
    user_input: str
