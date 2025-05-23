import mysql.connector
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# import datetime
from pydantic import BaseModel

class UserCreate(BaseModel):
    nom: str
    prenom: str
    email: str
    date_naissance: str
    # date_naissance: datetime.date
    pays: str
    ville: str
    code_postal: str
    nombre_achat: int

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a connection to the database
conn = mysql.connector.connect(
    database="ynov_ci",
    user="root",
    password="root",
    port=3306, 
    host="db"
)

@app.get("/users")
async def get_users():
    cursor = conn.cursor()
    sql_select_Query = "select * from utilisateur"
    cursor.execute(sql_select_Query)
    # get all records
    records = cursor.fetchall()
    return {'utilisateurs': 
        [
            {
                'id': record[0],
                'nom': record[1],
                'prenom': record[2],
                'email': record[3],
                'date_naissance': record[4],
                'pays': record[5],
                'ville': record[6],
                'code_postal': record[7],
                'nombre_achat': record[8]
            } for record in records
        ]
    }

# Rajouter une route POST pour ajouter un utilisateur
@app.post("/users")
async def add_user(user: UserCreate):
    cursor = conn.cursor()
    sql_insert_Query = """
        INSERT INTO utilisateur (nom, prenom, email, date_naissance, ville, code_postal, pays, nombre_achat)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """

    cursor.execute(sql_insert_Query, (
        user.nom, user.prenom, user.email, user.date_naissance,
        user.ville, user.code_postal, user.pays, user.nombre_achat
    ))

    conn.commit()
    return {"message": "Utilisateur ajouté avec succès"}