from flask import Flask

def post_routes(app: Flask):
    @app.route("/posts",methods=["GET"])
    def all_posts():
        return "OK"

    @app.route("/post/<int:post_id>",methods=["GET"])
    def post_by_id(post_id: int):
        return ""

    @app.route("/post",methods=["POST"])
    def new_post():
        return ""

    @app.route("/post/<int:post_id>",methods=["DELETE"])
    def delete_post(post_id: int):
        return ""