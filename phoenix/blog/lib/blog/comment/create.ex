defmodule Blog.Comment.Create do
  def new_comment(conn, params) do
    %{
      "postId" => post_id,
      "content" => content
    } = params

    user = conn.assigns[:user]

    {:ok, created} =
      Blog.Repo.insert(%Schema.Comment{
        content: content,
        post_idpost: post_id,
        user_iduser: user.iduser
      })

    %{
      idcomment: created.idcomment,
      content: created.content,
      postIdpost: created.post_idpost,
      userIduser: created.user_iduser
    }
  end
end
