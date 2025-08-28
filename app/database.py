from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv("DATABASE_URL","sqlite:///./test.db")

engine = create_engine(DATABASE_URL) #Connects to database

SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine) # create sessions (like opening a connection to run SQL queries)

Base = declarative_base() # declarative_base() returns a class --> base is used as a parent class for ORM models (Any class inheriting Base is automatically mapped to a DB table. )

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

import os
print("Using DB at:", os.path.abspath(DATABASE_URL.split("///")[-1]))        
        
                 

