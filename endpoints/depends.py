from typing import Optional
from fastapi import Depends, HTTPException, status
from core.security import JWTBearer, decode_access_token
from db.base import database
from models.response.users import ResponseUsers
from repositories.digital import DigitalRepository
from repositories.district import DistrictRepository
from repositories.oo import OORepository
from repositories.roles import RolesRepository
from repositories.users import UsersRepository
from repositories.oo_logins import OOLoginsRepository


def get_district_repository() -> DistrictRepository:
    return DistrictRepository(database)


def get_roles_repository() -> RolesRepository:
    return RolesRepository(database)


def get_users_repository() -> UsersRepository:
    return UsersRepository(database)


def get_oo_logins_repository() -> OOLoginsRepository:
    return OOLoginsRepository(database)


def get_oo_repository() -> OORepository:
    return OORepository(database)


def get_digital_environment_repository() -> DigitalRepository:
    return DigitalRepository(database)


async def get_current_user(
        users: UsersRepository = Depends(get_users_repository),
        token: str = Depends(JWTBearer())
) -> ResponseUsers:
    cred_exception = HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Credentials are not valid")
    payload = decode_access_token(token)
    if payload is None:
        raise cred_exception
    login: str = payload.get("sub")
    if login is None:
        raise cred_exception
    user = await users.get_by_login(login=login)
    if user is None:
        raise cred_exception
    return user


async def get_user(
        users: UsersRepository = Depends(get_users_repository),
        token: str = Depends(JWTBearer())
) -> Optional[ResponseUsers]:
    payload = decode_access_token(token)
    if payload is None:
        return None
    login: str = payload.get("sub")
    if login is None:
        return None
    user = await users.get_by_login(login=login)
    if user.id_role != 1:
        return None
    return user
