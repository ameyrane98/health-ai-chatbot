from fastapi import APIRouter, HTTPException
from models.user import UserCreate, UserLogin
from db.db import fake_users_db
from services.auth_service import hash_password, verify_password, create_access_token

router = APIRouter()

@router.post("/register")
def register(user: UserCreate):
    if user.username in fake_users_db:
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed_pw = hash_password(user.password)
    fake_users_db[user.username] = {
        "username": user.username,
        "email": user.email,
        "hashed_password": hashed_pw
    }
    return {"msg": "User created successfully"}

@router.post("/login")
def login(user: UserLogin):
    db_user = fake_users_db.get(user.username)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    if not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Invalid username or password")

    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}
@router.get("/debug/users")
def get_all_users():
    return fake_users_db