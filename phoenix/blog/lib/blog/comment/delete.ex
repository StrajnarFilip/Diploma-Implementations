defmodule Blog.Comment.Delete do
  import Ecto.Query

  def delete(conn, comment_id) do
    user = conn.assigns[:user]

    Schema.Comment
    |> where([comment], comment.idcomment == ^comment_id and comment.user_iduser == ^user.iduser)
    |> Blog.Repo.one()
    |> Blog.Repo.delete()

    %{id: comment_id}
  end
end
