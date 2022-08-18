defmodule BlogWeb.CommentController do
  use BlogWeb, :controller
  plug BlogWeb.FindUser when action in [:create, :delete]

  def show_post_comments(conn, %{"id" => post_id}) do
    comments = Blog.Comment.OfPost.show(post_id)
    json(conn, comments)
  end

  def create(conn, params) do
    created = Blog.Comment.Create.new_comment(conn, params)
    json(conn, created)
  end

  def delete(conn, %{"id" => comment_id}) do
    id = Blog.Comment.Delete.delete(conn, comment_id)
    json(conn, id)
  end
end
