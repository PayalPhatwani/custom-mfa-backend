from pydantic import BaseModel, EmailStr

# Below UserCreate class specify data a user must send to create an account.
# if user sends extra info such as name then ? Pydantic ignores extra fields by default unless you configure it otherwise --> it means it will not throw error on extra name field.
class UserCreate(BaseModel):
    email: EmailStr
    password: str

# Represents data you send back to the client. (if query for id and return user object it will not return all but only return the below specified attributes)
class UserResponse(BaseModel):
    id: int
    email: EmailStr
    is_active: bool

    class Confid:
        orm_mode = True        