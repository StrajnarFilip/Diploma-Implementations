defmodule Blog.Post.Show do
  def show_post(post_id) do
    post = Blog.Repo.get_by(Schema.Post, idpost: post_id)

    %{idpost: post.idpost, title: post.title}
  end
end
