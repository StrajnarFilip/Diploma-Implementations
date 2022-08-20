# pyright: reportUnusedFunction=false
from flask import Flask
from comment import comment_logic

def comment_routes(app: Flask):
    @app.route("/post-comments/<int:post_id>",methods=["GET"])
    def comments_of_post(post_id: int):
        return str(post_id)

    @app.route("/comment",methods=["POST"])
    def new_comment():
        return comment_logic.new_comment()

    @app.route("/comment/<int:id>",methods=["DELETE"])
    def delete_comment(id: int):
        return ""