from typing import Any
from data import database

def new_comment(post_id: int,comment: str, user_id: int)-> int:
    return database.insert_data_returning_id(
        "INSERT INTO public.comment (content,post_idpost,user_iduser) VALUES (%s,%s,%s) RETURNING idcomment;",
        [str(post_id),comment,str(user_id)])

def comment_by_id(comment_id:int)-> Any:
    return database.find_single(
        "SELECT idcomment,content,post_idpost,user_iduser FROM public.comment WHERE idcomment=%s;",
        [str(comment_id)])

def comments_of_post(post_id: int)-> list[Any]:
    return database.find_all(
        "SELECT idcomment,content,post_idpost,user_iduser FROM public.comment WHERE post_idpost=%s;",
        [str(post_id)])

def delete_comment(comment_id: int, user_id: int):
    database.delete_all(
        "DELETE FROM public.comment where idcomment=? AND user_iduser=?;",
        [str(comment_id),str(user_id)])