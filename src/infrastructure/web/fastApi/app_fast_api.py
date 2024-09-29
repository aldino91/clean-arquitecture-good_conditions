from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from src.infrastructure.database.datasource_mysql import MYSQL_DB  # Importa tu conexión a la BD
from contextlib import asynccontextmanager
from .controllers.routes.routes_user import router as user_router


# Define el ciclo de vida (lifespan)
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Lógica antes de que la app se inicie
    print("Creando tablas en la base de datos...")
    MYSQL_DB.create_tables()  # Crear las tablas al iniciar la app
    yield
    # Lógica cuando la app se cierra
    print("Cerrando conexiones...")


# Aplica el ciclo de vida a fastapi_app
app = FastAPI(lifespan=lifespan)

# Monta los archivos estáticos
app.mount("/static", StaticFiles(directory="src/presentations/views/static"), name="static")


@app.exception_handler(Exception)
async def exception_handler(exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": str(exc)},
    )


# Manejar error de ruta no encontrada (404)
@app.exception_handler(404)
async def not_found_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=404,
        content={"message": "Ruta no encontrada"},
    )


app.include_router(user_router)
