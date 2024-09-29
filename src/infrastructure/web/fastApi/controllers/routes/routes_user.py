from fastapi import APIRouter, Form, Request
from ...config import templates


router = APIRouter()


@router.get("/")
async def get_user(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@router.get("/auth/login-cliente")
async def get_login(request: Request):
    return templates.TemplateResponse(
        "login.html",
        {
            "request": request,
            "titulo": "Iniciar sesión",
            "form_data": {},
            "errors": {},
            "action_url": "/auth/login-cliente",
            "register_url": "/auth/register-cliente",
            "forgot_password_url": "/auth/forgot-password",
        },
    )


@router.post("/auth/login-cliente")
async def post_login(request: Request, username: str = Form(...), password: str = Form(...)):
    errors = {}
    form_data = {"username": username, "password": password}

    if not username:
        errors["username"] = ["El campo de usuario es obligatorio."]
    if not password:
        errors["password"] = ["El campo de contraseña es obligatorio."]

    if errors:
        return templates.TemplateResponse(
            "login.html",
            {
                "request": request,
                "titulo": "Iniciar sesión",
                "form_data": form_data,
                "errors": errors,
                "action_url": "/auth/login-cliente",
                "register_url": "/auth/register-cliente",
                "forgot_password_url": "/auth/forgot-password",
            },
        )

    # Procesar login exitoso
    return {"message": "Inicio de sesión exitoso"}


@router.get("/auth/registrar-cliente")
async def registrar_cliente(request: Request):
    return templates.TemplateResponse("client.html", {"request": request})
