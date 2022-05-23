import datetime

import jose
from fastapi import Request, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext
from jose import jwt, ExpiredSignatureError, JWTError
from .config import ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM
from werkzeug.security import check_password_hash, generate_password_hash
pwd_context = CryptContext(schemes=["bcrypt_sha256"], deprecated="auto")


def hash_password(password: str) -> str:
    return generate_password_hash(password)


def verify_password(password: str, hash: str) -> bool:
    return check_password_hash(hash, password)


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    to_encode.update({"exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(data: dict) -> str:
    to_encode = data.copy()
    to_encode.update({"exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str):
    try:
        encoded_jwt = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.JWSError:
        return None
    except ExpiredSignatureError:
        return None
    except AttributeError:
        return None
    except JWTError:
        return None
    return encoded_jwt


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        exp = HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid auth token")
        if credentials:
            token = decode_access_token(credentials.credentials)
            if token is None:
                raise exp
            return credentials.credentials
        else:
            raise exp
