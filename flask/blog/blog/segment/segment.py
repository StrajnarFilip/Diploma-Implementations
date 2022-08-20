from flask import Flask

def segment_routes(app: Flask):
    @app.route("/post-segments/<int:post_id>",methods=["GET"])
    def segments_of_post(post_id: int):
        return "OK"

    @app.route("/segment",methods=["POST"])
    def new_segment(post_id: int):
        return ""

    @app.route("/segment/<int:post_id>",methods=["DELETE"])
    def delete_segment():
        return ""