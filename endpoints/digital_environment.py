from fastapi import APIRouter, Depends, Response, HTTPException, status
from models.digital_environment_import import DigitalImport, DigitalGet
from models.users import Users
from repositories.digital_environment import DigitalEnvironment
from repositories.oo import OORepository
from .depends import get_oo_repository, get_digital_environment_repository, get_current_user, get_admin_user

router = APIRouter()


@router.post("/import", response_class=Response)
async def import_digital_items(
        model: DigitalImport,
        digital_environment_repository: DigitalEnvironment = Depends(get_digital_environment_repository),
        oo_repository: OORepository = Depends(get_oo_repository),
        current_user: Users = Depends(get_current_user)
):
    if not current_user.is_admin():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied")

    for oo_login in model.items:
        exist_oo_item = await oo_repository.get_by_oo_login_and_year(oo_login=oo_login, year=model.year)
        if not exist_oo_item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="item not found")
        if not await digital_environment_repository.get_one(oo_login, model.year):
            await digital_environment_repository.create(exist_oo_item)
    return


@router.get("/get_all", response_model=DigitalGet)
async def get_all(
        year: str,
        digital_environment_repository: DigitalEnvironment = Depends(get_digital_environment_repository)
):
    return await digital_environment_repository.get_all(year)
