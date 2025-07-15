import os
from typing import List
import asyncio
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

from passlib.context import CryptContext


os.makedirs('database', exist_ok=True)
DATABASE_URL = "sqlite:///./database/hsr.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

@asynccontextmanager
async def lifespan(app: FastAPI):

    print("Starting up server...")
    yield

    print("Shutting down server...")
    await asyncio.sleep(0.1)  


app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"]
)


@app.middleware("http")
async def log_requests(request, call_next):
    print(f"Incoming request: {request.method} {request.url}")
    try:
        response = await call_next(request)
        print(f"Response status: {response.status_code}")
        return response
    except Exception as e:
        print(f"Error processing request: {e}")
        raise

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    role = Column(String, default="employee")

Base.metadata.create_all(bind=engine)


class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    is_active: bool
    role: str

    class Config:
        orm_mode = True

class Payslip(BaseModel):
    month: str
    basic: int
    hra: int
    conveyance: int
    medical: int
    deductions: int

    class Config:
        orm_mode = True

class Message(BaseModel):
    role: str  
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


payslips_db = [
    Payslip(month="January 2025", basic=50000, hra=15000, conveyance=3000, medical=2000, deductions=5000),
]



@app.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")

    hashed_pw = pwd_context.hash(user.password)
    new_user = User(
        email=user.email,
        username=user.username,
        password=hashed_pw
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login", response_model=UserResponse)
def login(request: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user or not pwd_context.verify(request.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return user

@app.get("/users/me/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/api/payslips", response_model=List[Payslip])
def get_payslips():
    return payslips_db

@app.post("/chat")
async def chat_with_ai(chat_request: ChatRequest):
    """
    Simple chat endpoint that provides HR-related responses.
    """
    try:
        if not chat_request.messages:
            raise HTTPException(status_code=400, detail="No messages provided")

        # Get the last message from the user
        last_message = chat_request.messages[-1]
        
        # Simple response logic based on keywords
        user_message = last_message.content.lower()
        
        if "leave" in user_message:
            response = "To apply for leave, please submit a request through the HR portal at least 3 days in advance."
        elif "salary" in user_message or "payslip" in user_message:
            response = "You can access your payslip through the HR portal. Payslips are typically available by the 5th of each month."
        elif "benefits" in user_message:
            response = "Our benefits package includes health insurance, retirement plans, and paid time off. Please check the HR portal for detailed information."
        elif "help" in user_message:
            response = "I can help you with information about leaves, salary, benefits, and general HR policies. What would you like to know?"
        else:
            response = "I'm your HR assistant. I can help you with information about leaves, salary, benefits, and general HR policies. What would you like to know?"

        return {"message": response}

    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))
