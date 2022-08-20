from flask import Flask

def user_routes(app: Flask):
    @app.route("/user-information",methods=["GET"])
    def user_info():
        return "OK"

    @app.route("/login",methods=["POST"])
    def login():
        return ""

    @app.route("/register",methods=["POST"])
    def register():
        return ""

    @app.route("/logout",methods=["POST"])
    def logout():
        return ""