from pydantic import BaseModel


class DigitalDistrict(BaseModel):
    district_name: str
    osnash_true: int
    count_all: int
    arm_ped: int
    arm_adm: int
    i_panel: int
    notebook: int
    mfu: int
    server: int
    smart_tv: int
    ip_camera: int
    ik: int
