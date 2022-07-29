from fastapi import APIRouter, Depends, HTTPException, status, Path
from models.response.info import ResponseInfo
from repositories.oo import OORepository
from repositories.digital import DigitalRepository
from .depends import get_oo_repository, get_digital_repository

router = APIRouter()


@router.get("/{id_oo}", response_model=ResponseInfo)
async def read_oo(
        id_oo: int = Path(...),
        oo_repository: OORepository = Depends(get_oo_repository),
        digital_repository: DigitalRepository = Depends(get_digital_repository)
):
    exist = await oo_repository.get_by_id(id_oo)
    if not exist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with id={id_oo} not found"
        )
    response = ResponseInfo(
        base_info=exist,
        digital=await digital_repository.get_by_id(id_oo)
    )
    return response
