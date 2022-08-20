from flask_cors import CORS
from flask import Flask

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

app.run(debug=True,port=7000)