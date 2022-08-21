# pyright: reportUnusedFunction=false
from typing import Any
from flask import Flask, request
from post import post_logic

def post_routes(app: Flask):
    @app.route("/posts",methods=["GET"])
    def all_posts() -> tuple[Any,int]:
        return post_logic.all_posts()

    @app.route("/post/<int:post_id>",methods=["GET"])
    def post_by_id(post_id: int) -> tuple[Any,int]:
        return post_logic.post_by_id(post_id)

    @app.route("/post",methods=["POST"])
    def new_post()-> tuple[Any,int]:
        return post_logic.create_post(request)

    @app.route("/post/<int:post_id>",methods=["DELETE"])
    def delete_post(post_id: int)-> tuple[Any,int]:
        return post_logic.delete_post(post_id,request.headers)