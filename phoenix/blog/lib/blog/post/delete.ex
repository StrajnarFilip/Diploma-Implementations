defmodule Blog.Post.Delete do
  import Ecto.Query

  def delete_post(post_id) do
    Schema.Comment
    |> where([comment], comment.post_idpost == ^post_id)
    |> Blog.Repo.delete_all()

    Schema.Segment
    |> where([segment], segment.post_idpost == ^post_id)
    |> Blog.Repo.delete_all()

    case Blog.Repo.get(Schema.Post, post_id)
         |> Blog.Repo.delete() do
      {:ok, _} -> "Post has been deleted"
      _ -> "Failed to delete post"
    end
  end
end
