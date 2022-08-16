from typing import List
from fastapi import APIRouter, Depends, Response, HTTPException, status
from models.request.digital import RequestDigital
from models.response.digital import ResponseAllDigital
from models.response.users import ResponseUsers
from repositories.digital import DigitalRepository
from .depends import get_digital_repository, get_current_user

router = APIRouter()


@router.post("/import", response_class=Response)
async def import_digital_items(
        model: List[RequestDigital],
        digital_repository: DigitalRepository = Depends(get_digital_repository),
        current_user: ResponseUsers = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")
    for item in model:
        await digital_repository.create(item)


@router.get("/get_all", response_model=ResponseAllDigital)
async def get_all(
        digital_repository: DigitalRepository = Depends(get_digital_repository)
):
    return await digital_repository.get_all()
