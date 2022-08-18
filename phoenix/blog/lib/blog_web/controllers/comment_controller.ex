defmodule BlogWeb.CommentController do
  use BlogWeb, :controller

  def show_post_comments(conn, %{"post_id" => post_id}) do
    render(conn, "comments.json", post_id: post_id)
  end

  def create(_conn, _params) do
  end

  def delete(_conn, _params) do
  end
end
