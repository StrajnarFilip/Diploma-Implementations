from typing import Any
from data import database


def all_posts() -> list[dict[str, Any]]:
    posts = database.find_all("SELECT idpost,title FROM public.post;", [])

    reshaped = list(map(lambda post: {"idpost": post[0], "title": post[1]}, posts))

    return reshaped


def post_by_id(post_id: int)-> Any:
    return database.find_single(
        "SELECT idpost,title FROM public.post WHERE idpost=%s;", [str(post_id)]
    )


def create_post(post_title: str) -> int:
    return database.insert_data_returning_id(
        "INSERT INTO public.post (title) VALUES (%s) RETURNING idpost;", [post_title]
    )


def delete_post(post_id: int):
    database.delete_all("DELETE FROM public.comment WHERE post_idpost=%s", [str(post_id)])
    database.delete_all("DELETE FROM public.segment WHERE post_idpost=%s", [str(post_id)])
    database.delete_all("DELETE FROM public.post WHERE idpost=%s", [str(post_id)])
