from typing import Any
from data import user_data
from os import urandom

def user_info(headers: Any) -> tuple[Any,int]:
    try:
        token=headers["Authorization"]
        data=user_data.user_info(token)

        return ({
            "id":data[0],
            "mail":data[1],
            "role":data[2] },200)
    except:
        return ({"text":"Failed"},400)


def login(body: Any) -> tuple[Any,int]:
    try:
        email=body["email"]
        password=body["password"]
        user_id=user_data.user_id_login(email,password)
        new_token=urandom(32).hex().upper()
        user_data.set_user_token(user_id,new_token)
        return ({"text":new_token},200)
    except:
        return ({"text":"Failed"},400)


def register(body: Any) -> tuple[Any,int]:
    success=user_data.register(body["email"],body["password"])
    if success:
        return ({"text":"OK"},200)
    else:
        return ({"text":"Failed"},400)

def logout(headers: Any) -> tuple[Any,int]:
    try:
        token=token=headers["Authorization"]
        user=user_data.user_info(token)
        user_data.set_user_token(int(user[0]),"")
        return ({"text":"OK"},200)
    except:
        return ({"text":"Failed"},400) 