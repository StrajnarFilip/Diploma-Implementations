# pyright: reportUnusedFunction=false
from flask import Flask, request
from segment import segment_logic

def segment_routes(app: Flask):
    @app.route("/post-segments/<int:post_id>",methods=["GET"])
    def segments_of_post(post_id: int):
        return segment_logic.segments_of_post(post_id)

    @app.route("/segment",methods=["POST"])
    def new_segment():
        return segment_logic.create(request)

    @app.route("/segment/<int:segment_id>",methods=["DELETE"])
    def delete_segment(segment_id:int):
        return segment_logic.delete(segment_id,request.headers)