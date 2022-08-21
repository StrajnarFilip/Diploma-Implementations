from typing import Any

from flask import Request
from data import segment_data ,user_data

def segments_of_post(post_id: int) -> tuple[Any,int]:
    try:
        segments=segment_data.segments_of_post(post_id)
        return (segments,200)
    except:
        return ("Failed",400) 

def create(request: Request) -> tuple[Any,int]:
    try:
        headers=request.headers
        body: Any=request.json
        user_role= user_data.user_info(headers["Authorization"])[2]
        if(user_role != "admin"):
            raise Exception("Unauthorized")

        segment=segment_data.new_segment(
            body["postIdpost"],
            body["type"],
            body["text"],
            body["source"]
        )
        return (segment,200)
    except:
        return ("Failed",400) 

def delete(segment_id: int, headers: Any) -> tuple[Any,int]:
    try:
        user_role= user_data.user_info(headers["Authorization"])[2]
        if(user_role != "admin"):
            raise Exception("Unauthorized")

        segment_data.delete_segment(segment_id)
        return ({"id":segment_id},200)
    except:
        return ("Failed",400) 