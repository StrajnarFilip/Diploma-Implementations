defmodule Blog.Post.Index do
  import Ecto.Query

  def all_posts do
    Schema.Post
    |> select([post], %{idpost: post.idpost, title: post.title})
    |> Blog.Repo.all()
  end
end
