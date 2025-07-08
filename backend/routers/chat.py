from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from services.auth_service import SECRET_KEY, ALGORITHM
from models.chat import ChatMessage  # your Pydantic model
from services.agent_core import get_bot_response  # your function to get bot response

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.post("/chat")


@router.post("/chat")
def chat_endpoint(
    message: ChatMessage,  # ✅ Parse JSON body into this!
    token_user: str = Depends(get_current_user)  # ✅ Validate JWT
):
    response = get_bot_response(message.user_input)
    return {"msg": response}
