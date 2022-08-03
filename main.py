import uvicorn
from typing import Optional
from fastapi.openapi.docs import get_redoc_html, get_swagger_ui_html
from fastapi.openapi.utils import get_openapi
from fastapi.templating import Jinja2Templates
from fastapi import Depends, FastAPI, HTTPException, status, Request, Cookie
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from core.security import verify_password
from db.base import database, redis
from endpoints import district, roles, users, auth, oo_logins, oo, digital, info, ege, growing_point, vpr
from endpoints.depends import get_users_repository, get_user
from repositories.users import UsersRepository

app = FastAPI(
    title="FastAPI",
    version="0.1.0",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

security = HTTPBasic()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

app.include_router(auth.router, prefix='/auth', tags=["auth"])
app.include_router(users.router, prefix='/user', tags=["users"])
app.include_router(roles.router, prefix='/roles', tags=["roles"])
app.include_router(district.router, prefix='/district', tags=["district"])
app.include_router(oo_logins.router, prefix='/oo_logins', tags=["oo_logins"])
app.include_router(oo.router, prefix='/oo', tags=["oo"])
app.include_router(digital.router, prefix='/digital', tags=["digital"])
app.include_router(info.router, prefix='/info', tags=["info"])
app.include_router(ege.router, prefix='/ege', tags=["ege"])
app.include_router(growing_point.router, prefix='/growing_points', tags=["growing_point"])
app.include_router(vpr.router, prefix='/vpr', tags=["vpr"])


@app.on_event("startup")
async def startup():
    await redis.connect()
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
    await redis.disconnect()


async def get_current_username(
        credentials: HTTPBasicCredentials = Depends(security),
        users: UsersRepository = Depends(get_users_repository)
):
    user = await users.get_by_login(credentials.username)
    if user is None or not verify_password(credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect login or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    if not user.is_admin():
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access Denied",
            headers={"WWW-Authenticate": "Basic"},
        )
    return user.login


@app.get("/docs", include_in_schema=False)
async def get_swagger_documentation():
    return get_swagger_ui_html(openapi_url="/openapi.json", title="docs")


@app.get("/redoc", include_in_schema=False)
async def get_redoc_documentation(username: str = Depends(get_current_username)):
    return get_redoc_html(openapi_url="/openapi.json", title="docs")


@app.get("/openapi.json", include_in_schema=False)
async def openapi():
    return get_openapi(title=app.title, version=app.version, routes=app.routes)


@app.get("/", response_class=HTMLResponse)
async def index(request: Request, refresh_token: Optional[str] = Cookie(None)):
    current_user = None
    if refresh_token:
        current_user = await get_user(users=get_users_repository(), token=refresh_token)
    return templates.TemplateResponse("map.html", {
        "request": request,
        "title": "Интерактивная карта",
        "user": current_user,
    })


@app.get("/size", response_class=HTMLResponse)
async def index(request: Request):

    return templates.TemplateResponse("size.html", {
        "request": request,
        "title": "Размер экрана",
    })


@app.get("/login", response_class=HTMLResponse)
async def login(request: Request):
    return templates.TemplateResponse("login.html", {"request": request, "title": "Авторизация"})


@app.get("/private", response_class=HTMLResponse)
async def private(request: Request):
    return templates.TemplateResponse("protected.html", {"request": request, "title": "Приватно"})


if __name__ == "__main__":
    uvicorn.run("main:app", host='10.10.2.141', reload=False)
