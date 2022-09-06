from flask_cors import CORS
from flask import Flask
from waitress import serve

from comment.comment import comment_routes
from segment.segment import segment_routes
from post.post import post_routes
from user.user import user_routes


app = Flask("blog")
CORS(app)
comment_routes(app)
segment_routes(app)
post_routes(app)
user_routes(app)

serve(app, host='127.0.0.1', port=7000,
threads=8, connection_limit=200,backlog=50_000,channel_timeout=500,
asyncore_use_poll=True)