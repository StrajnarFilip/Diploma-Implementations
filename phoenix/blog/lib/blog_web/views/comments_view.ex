defmodule BlogWeb.CommentsView do
  use BlogWeb, :view
  import Schema.Comment
  import Ecto.Query

  def render("comments.json", %{post_id: post_id}) do
    Schema.Comment
    |> where(post_idpost: ^post_id)
    |> Ecto.Query.select([c], %{
      idcomment: c.idcomment,
      content: c.content,
      postIdpost: c.post_idpost,
      userIduser: c.user_iduser
    })
    |> Blog.Repo.all()
  end
end

# from(c in Schema.Comment,
#   where: c.post_idpost == ^post_id,
#   select: %{
#     idcomment: c.idcomment,
#     content: c.content,
#     postIdpost: c.post_idpost,
#     userIduser: c.user_iduser
#   }
# )
# |> Blog.Repo.all()
