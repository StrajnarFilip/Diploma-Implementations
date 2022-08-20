# pyright: reportUnusedFunction=false
from flask import Flask
from flask import request
from user import user_logic

def user_routes(app: Flask):
    @app.route("/user-information",methods=["GET"])
    def user_info():
        return ""

    @app.route("/login",methods=["POST"])
    def login():
        return ""

    @app.route("/register",methods=["POST"])
    def register():
        return user_logic.register(request.json)

    @app.route("/logout",methods=["POST"])
    def logout():
        return ""