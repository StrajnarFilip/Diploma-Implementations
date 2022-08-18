defmodule BlogWeb.PostController do
  use BlogWeb, :controller
  plug BlogWeb.AdminOnly when action in [:create, :delete]

  def index(conn, _params) do
    posts = Blog.Post.Index.all_posts()
    json(conn, posts)
  end

  def show(conn, %{"id" => id}) do
    post = Blog.Post.Show.show_post(id)
    json(conn, post)
  end

  def create(conn, %{"title" => title}) do
    json(conn, Blog.Post.Create.new_post(title))
  end

  def delete(conn, %{"id" => id}) do
    json(conn, Blog.Post.Delete.delete_post(id))
  end
end
