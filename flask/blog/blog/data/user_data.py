from typing import Any
from data import database
from hashlib import sha256


def _sha256_hash(password: str) -> str:
    password_bytes = password.encode("utf-8")
    return sha256(password_bytes).hexdigest().upper()


def register(email: str, password: str) -> bool:
    how_many_emails = database.find_single(
        "SELECT COUNT(*) FROM public.user WHERE email=%s ;", [email]
    )[0]

    if how_many_emails == 0:
        database.insert_data(
            "INSERT INTO public.user (email,password) VALUES (%s,%s);",
            [email, _sha256_hash(password)],
        )
        return True
    else:
        return False


def user_info(token: str) -> Any:
    return database.find_single(
        "SELECT iduser,email,role FROM public.user WHERE cookie=%s;", [token]
    )


def user_id_login(email: str, password: str) -> int:
    return database.find_single(
        "SELECT iduser FROM public.user WHERE email=%s AND password=%s;",
        [email, _sha256_hash(password)],
    )[0]


def set_user_token(user_id: int, new_token: str):
    database.insert_data(
        "UPDATE public.user SET cookie=%s WHERE iduser=%s;", [new_token, str(user_id)]
    )
