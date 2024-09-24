from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from src.infrastructure.database.sqlite import DataSourceSQLiteImpl
from src.core.use_cases.user_use_cases import UserUseCases

app = FastAPI()

app.mount("/static", StaticFiles(directory="src/infrastructure/templates"), name="templates")
templates = Jinja2Templates(directory="src/infrastructure/templates")

user_repository = DataSourceSQLiteImpl()
user_use_cases = UserUseCases(user_repository)


@app.get("/user/{user_id}")
async def get_user(request: Request, user_id: int):
    user = user_use_cases.get_user(user_id)
    return templates.TemplateResponse(
        "user.html", {"request": request, "user": user, "message": "Hello World from FastAPI"}
    )
