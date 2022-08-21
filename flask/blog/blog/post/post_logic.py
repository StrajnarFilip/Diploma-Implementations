from email import header
from typing import Any

from flask import Request
from data import post_data
from data import user_data

def all_posts() -> tuple[Any,int]:
    try:
        posts=post_data.all_posts()
        return (posts,200)
    except:
        return ("Failed",400) 

def post_by_id(post_id: int) -> tuple[Any,int]:
    try:
        post=post_data.post_by_id(post_id)
        return ({
            "idpost": post[0],
            "title": post[1]
        },200)
    except:
        return ("Failed",400) 

def create_post(request: Request) -> tuple[Any,int]:
    try:
        headers=request.headers
        body: Any=request.json
        user_role= user_data.user_info(headers["Authorization"])[2]
        if(user_role != "admin"):
            raise Exception("Unauthorized")

        post_id=post_data.create_post(body["title"])
        post = post_data.post_by_id(post_id)

        return ({
            "idpost": post[0],
            "title": post[1]
        },200)
    except:
        return ("Failed",400) 

def delete_post(post_id: int,headers: Any) -> tuple[Any,int]:
    try:
        user_role= user_data.user_info(headers["Authorization"])[2]
        if(user_role != "admin"):
            raise Exception("Unauthorized")
        post_data.delete_post(post_id)
        return ({"id":post_id},200)
    except:
        return ("Failed",400) 