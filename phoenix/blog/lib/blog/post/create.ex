defmodule Blog.Post.Create do
  def new_post(title) do
    case %Schema.Post{title: title} |> Blog.Repo.insert() do
      {:ok, _} -> "Ok"
      _ -> "Failed to create new post."
    end
  end
end
