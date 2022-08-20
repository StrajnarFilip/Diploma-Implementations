from typing import Any
from data import user_data
from os import urandom

def user_info():
    pass

def login(body: Any) -> tuple[Any,Any]:
    try:
        email=body["email"]
        password=body["password"]
        user_id=user_data.user_id_login(email,password)
        new_token=urandom(32).hex().upper()
        user_data.set_user_token(user_id,new_token)
        return (new_token,200)
    except:
        return ("Failed",400)


def register(body: Any) -> tuple[Any,Any]:
    success=user_data.register(body["email"],body["password"])
    if success:
        return ("Ok",200)
    else:
        return ("Failed",400)

def logout():
    pass