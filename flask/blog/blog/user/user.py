# pyright: reportUnusedFunction=false
from typing import Any
from flask import Flask
from flask import request
from user import user_logic

def user_routes(app: Flask):
    @app.route("/user-information",methods=["GET"])
    def user_info():
        return user_logic.user_info(request.headers)

    @app.route("/login",methods=["POST"])
    def login()-> tuple[Any,int]:
        return user_logic.login(request.json)

    @app.route("/register",methods=["POST"])
    def register()-> tuple[Any,int]:
        return user_logic.register(request.json)

    @app.route("/logout",methods=["POST"])
    def logout()-> tuple[Any,int]:
        return user_logic.logout(request.headers)