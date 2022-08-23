defmodule Blog.Post.Create do
  def new_post(title) do
    case %Schema.Post{title: title} |> Blog.Repo.insert(returning: true) do
      {:ok, %Schema.Post{idpost: new_id}} -> %{id: new_id}
      _ -> "Failed to create new post."
    end
  end
end
