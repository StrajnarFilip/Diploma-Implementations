defmodule Blog.Comment.OfPost do
  import Ecto.Query

  def show(post_id) do
    Schema.Comment
    |> where(post_idpost: ^post_id)
    |> select([comment], %{
      idcomment: comment.idcomment,
      content: comment.content,
      postIdpost: comment.post_idpost,
      userIduser: comment.user_iduser
    })
    |> Blog.Repo.all()
  end
end
