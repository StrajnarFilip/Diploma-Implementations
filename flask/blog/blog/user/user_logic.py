from typing import Any
from data import user_data

def user_info():
    pass

def login():
    pass

def register(body: Any) -> tuple[Any,Any]:
    success=user_data.register(body["email"],body["password"])
    if success:
        return ("Ok",200)
    else:
        return ("Failed",400)

def logout():
    pass