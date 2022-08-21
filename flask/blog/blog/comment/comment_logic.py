from pprint import pprint
from typing import Any

from flask.wrappers import Request
from data import comment_data
from data import user_data


def comments_on_post(post_id: int) -> tuple[Any, int]:
    try:
        return (comment_data.comments_of_post(post_id), 200)
    except:
        return ("Failed", 400)


def new_comment(request: Request) -> tuple[Any, int]:
    try:
        headers = request.headers
        body: dict[str, Any] = request.json
        user_id: int = user_data.user_info(headers["Authorization"])[0]
        comment_id: int = comment_data.new_comment(
            body["content"], body["postId"], user_id
        )

        comment = comment_data.comment_by_id(comment_id)
        
        return (comment,200)
    except:
        return ("Failed", 400)


def delete_comment(comment_id: int, headers: Any):
    try:
        user_id: int = user_data.user_info(headers["Authorization"])[0]
        comment_data.delete_comment(comment_id, user_id)
        return ({"id": comment_id}, 200)
    except:
        return ("Failed", 400)
