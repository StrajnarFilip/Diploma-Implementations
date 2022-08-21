# pyright: reportUnknownVariableType=false
# pyright: reportUnknownMemberType=false
# pyright: reportMissingTypeStubs=false
# pyright: reportOptionalSubscript=false
from typing import Any
import psycopg2


def connect_pg():
    return psycopg2.connect(
        host="127.0.0.1",
        port=5433,
        database="postgres",
        user="postgres",
        password="f5da15f2addf6857266afd80d19bd20da241f8bf334af04f",
    )


def insert_data(query: str, values_tuple: list[str]):
    with connect_pg() as connection:
        with connection.cursor() as cursor:
            cursor.execute(query, tuple(values_tuple))
            connection.commit()


def insert_data_returning_id(query: str, values_tuple: list[str]) -> int:
    with connect_pg() as connection:
        with connection.cursor() as cursor:
            cursor.execute(query, tuple(values_tuple))
            connection.commit()
            return cursor.fetchone()[0]


def delete_all(query: str, values_tuple: list[str]):
    insert_data(query, values_tuple)


def delete_single_by_id(query: str, id: int):
    with connect_pg() as connection:
        with connection.cursor() as cursor:
            cursor.execute(query, (str(id)))
            connection.commit()


def find_single(query: str, values_tuple: list[str]) -> Any:
    with connect_pg() as connection:
        with connection.cursor() as cursor:
            cursor.execute(query, tuple(values_tuple))
            return cursor.fetchone()


def find_all(query: str, values_tuple: list[str]) -> list[Any]:
    with connect_pg() as connection:
        with connection.cursor() as cursor:
            cursor.execute(query, tuple(values_tuple))
            return cursor.fetchall()
