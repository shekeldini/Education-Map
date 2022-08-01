from pydantic import BaseModel


class RequestDigital(BaseModel):
    id_oo: int
    cos2020: bool
    cos2021: bool
    cos2022: bool
    osnash: bool
    klass: int
    klass_smart: int
    klass_ik: int
    arm_ped: int
    arm_adm: int
    i_panel: int
    notebook: int
    mfu: int
    ped_notebook: int
    adm_notebook: int
    server: int
    smart_tv: int
    ip_camera: int
    ik: int

