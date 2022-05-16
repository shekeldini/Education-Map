import uvicorn
import secrets
from fastapi.openapi.docs import get_redoc_html, get_swagger_ui_html
from fastapi.openapi.utils import get_openapi

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials

from db.base import database
from endpoints import district, oo_location_type, roles, users, auth, name_of_the_settlement, \
    organizational_and_legal_form, population_of_the_settlement, oo_logins, organisation_status, oo

app = FastAPI(
    title="FastAPI",
    version="0.1.0",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

security = HTTPBasic()

app.include_router(auth.router, prefix='/auth', tags=["auth"])
app.include_router(users.router, prefix='/user', tags=["users"])
app.include_router(roles.router, prefix='/roles', tags=["roles"])
app.include_router(district.router, prefix='/district', tags=["district"])
app.include_router(oo_location_type.router, prefix='/oo_location_type', tags=["oo_location_type"])
app.include_router(name_of_the_settlement.router, prefix='/name_of_the_settlement', tags=["name_of_the_settlement"])
app.include_router(organizational_and_legal_form.router, prefix='/organizational_and_legal_form',
                   tags=["organizational_and_legal_form"])
app.include_router(population_of_the_settlement.router, prefix='/population_of_the_settlement',
                   tags=["population_of_the_settlement"])
app.include_router(oo_logins.router, prefix='/oo_logins', tags=["oo_logins"])
app.include_router(organisation_status.router, prefix='/organisation_status', tags=["organisation_status"])
app.include_router(oo.router, prefix='/oo', tags=["oo"])


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    print("disconnect")
    await database.disconnect()


def get_current_username(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, "admin")
    correct_password = secrets.compare_digest(credentials.password, "687980@rA")
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect login or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username


@app.get("/docs", include_in_schema=False)
async def get_swagger_documentation(username: str = Depends(get_current_username)):
    return get_swagger_ui_html(openapi_url="/openapi.json", title="docs")


@app.get("/redoc", include_in_schema=False)
async def get_redoc_documentation(username: str = Depends(get_current_username)):
    return get_redoc_html(openapi_url="/openapi.json", title="docs")


@app.get("/openapi.json", include_in_schema=False)
async def openapi(username: str = Depends(get_current_username)):
    return get_openapi(title=app.title, version=app.version, routes=app.routes)


if __name__ == "__main__":
    uvicorn.run("main:app", host='localhost', reload=False)
