import mysql.connector
import os
from pydantic import BaseModel
from fastapi import Request, HTTPException
from fastapi import FastAPI, Request, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
import datetime
import hashlib

JWT_SECRET = os.environ.get("JWT_SECRET", "dev_secret")  # Mets une vraie valeur secrète en prod
JWT_ALGO = "HS256"

class UserCreate(BaseModel):
    nom: str
    prenom: str
    email: str
    date_naissance: str
    pays: str
    ville: str
    code_postal: str
    nombre_achat: int

class AdminRegister(BaseModel):
    email: str
    password: str

class AdminLogin(BaseModel):
    email: str
    password: str

class DeleteUsersRequest(BaseModel):
    ids: List[int]

app = FastAPI()
origins = ["*"]

@app.get("/")
async def hello_world():
    return "Hello world"

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- UTILISATEURS ---
@app.get("/users")
async def get_users():
    # Connexion à la base via variables d'environnement
    conn = mysql.connector.connect(
        database=os.environ["MYSQL_DATABASE"],
        user=os.environ["MYSQL_USER"],
        password=os.environ["MYSQL_ROOT_PASSWORD"],
        port=int(os.environ.get("PORT", 3306)),
        host=os.environ["MYSQL_HOST"]
    )
    cursor = conn.cursor()
    sql_select_Query = "select * from utilisateur"
    cursor.execute(sql_select_Query)
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

@app.post("/users")
async def add_user(user: UserCreate):
    # Connexion à la base via variables d'environnement
    conn = mysql.connector.connect(
        database=os.environ["MYSQL_DATABASE"],
        user=os.environ["MYSQL_USER"],
        password=os.environ["MYSQL_ROOT_PASSWORD"],
        port=int(os.environ.get("PORT", 3306)),
        host=os.environ["MYSQL_HOST"]
    )
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

# --- ADMIN ---

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def create_jwt(email: str) -> str:
    payload = {
        "email": email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=12)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)

def verify_jwt(token: str):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expiré")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token invalide")

security = HTTPBearer()

def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verify_jwt(token)
    # Ici, tu pourrais vérifier en base si l'email est bien admin
    return payload

# CICD/admin/s-inscrire && /admin/register
@app.post("/admin/register")
async def admin_register(admin: AdminRegister):
    # Connexion à la base via variables d'environnement
    conn = mysql.connector.connect(
        database=os.environ["MYSQL_DATABASE"],
        user=os.environ["MYSQL_USER"],
        password=os.environ["MYSQL_ROOT_PASSWORD"],
        port=int(os.environ.get("PORT", 3306)),
        host=os.environ["MYSQL_HOST"]
    )
    cursor = conn.cursor()
    # Vérifier si l'admin existe déjà
    cursor.execute("SELECT id FROM admin WHERE email=%s", (admin.email,))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="Cet email existe déjà.")
    # Créer l'admin
    hashed = hash_password(admin.password)
    cursor.execute("INSERT INTO admin (email, password) VALUES (%s, %s)", (admin.email, hashed))
    conn.commit()
    return {"message": "Compte admin créé avec succès !"}

@app.post("/admin/login")
async def admin_login(admin: AdminLogin):
    # Connexion à la base via variables d'environnement
    conn = mysql.connector.connect(
        database=os.environ["MYSQL_DATABASE"],
        user=os.environ["MYSQL_USER"],
        password=os.environ["MYSQL_ROOT_PASSWORD"],
        port=int(os.environ.get("PORT", 3306)),
        host=os.environ["MYSQL_HOST"]
    )
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM admin WHERE email=%s", (admin.email,))
    row = cursor.fetchone()
    if not row or hash_password(admin.password) != row[0]:
        raise HTTPException(status_code=401, detail="Identifiants invalides")
    token = create_jwt(admin.email)
    return {"token": token}

@app.get("/admin/me")
async def get_me(credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = verify_jwt(credentials.credentials)
    return {"isAdmin": True, "email": payload["email"]}

@app.get("/admin/users")
async def get_admin_users(credentials: HTTPAuthorizationCredentials = Depends(security)):
    # Connexion à la base via variables d'environnement
    conn = mysql.connector.connect(
        database=os.environ["MYSQL_DATABASE"],
        user=os.environ["MYSQL_USER"],
        password=os.environ["MYSQL_ROOT_PASSWORD"],
        port=int(os.environ.get("PORT", 3306)),
        host=os.environ["MYSQL_HOST"]
    )
    # Optionnel : vérifier que l'utilisateur est admin via le token
    cursor = conn.cursor()
    sql_select_Query = "SELECT id, nom, email FROM utilisateur"
    cursor.execute(sql_select_Query)
    records = cursor.fetchall()
    users = [
        {"id": record[0], "name": record[1], "email": record[2]}
        for record in records
    ]
    return users

@app.delete("/admin/users")
async def delete_admin_users(body: DeleteUsersRequest, credentials: HTTPAuthorizationCredentials = Depends(security)):
    # Connexion à la base via variables d'environnement
    conn = mysql.connector.connect(
        database=os.environ["MYSQL_DATABASE"],
        user=os.environ["MYSQL_USER"],
        password=os.environ["MYSQL_ROOT_PASSWORD"],
        port=int(os.environ.get("PORT", 3306)),
        host=os.environ["MYSQL_HOST"]
    )
    # Vérifie le token admin
    if not body.ids:
        raise HTTPException(status_code=400, detail="No IDs provided")
    cursor = conn.cursor()
    format_strings = ','.join(['%s'] * len(body.ids))
    sql = f"DELETE FROM utilisateur WHERE id IN ({format_strings})"
    cursor.execute(sql, tuple(body.ids))
    conn.commit()
    return {"deleted": body.ids}
