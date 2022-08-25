from typing import Any
from data import database

def comment_by_id(comment_id: int) -> dict[str,Any]:
    comment= database.find_single(
        """SELECT idcomment,content,post_idpost,user_iduser
        FROM public.comment
        WHERE idcomment=%s;""",
        [str(comment_id)],
    )
    return {
        "idcomment": comment[0],
        "content":comment[1],
        "postIdpost":comment[2],
        "userIduser":comment[3]
    }


def comments_of_post(post_id: int) -> list[Any]:
    comments= database.find_all(
        """SELECT idcomment,content,post_idpost,user_iduser
        FROM public.comment WHERE post_idpost=%s;""",
        [str(post_id)],
    )

    reshaped= list(map(lambda comment: {
        "idcomment": comment[0],
        "content":comment[1],
        "postIdpost":comment[2],
        "userIduser":comment[3],
    },comments))

    return reshaped

def new_comment(comment_content: str,post_id: int, user_id: int) -> int:
    return database.insert_data_returning_id(
        """INSERT INTO public.comment (content,post_idpost,user_iduser)
        VALUES (%s,%s,%s)
        RETURNING idcomment;""",
        [comment_content, str(post_id), str(user_id)],
    )


def delete_comment(comment_id: int, user_id: int):
    database.delete_all(
        """DELETE FROM public.comment
        WHERE idcomment=%s
        AND user_iduser=%s;""",
        [str(comment_id), str(user_id)],
    )
