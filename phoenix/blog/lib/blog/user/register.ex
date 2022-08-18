defmodule Blog.User.Register do
  import Ecto.Query
  import Blog.Hash

  def register(email, password) do
    if(email_already_exists?(email)) do
      "Email already exists."
    else
      %Schema.User{email: email, password: password |> sha256_to_hex}
      |> Blog.Repo.insert()

      "User has been registered."
    end
  end

  defp email_already_exists?(email) do
    results =
      Schema.User
      |> where([user], user.email == ^email)
      |> Blog.Repo.all()

    length(results) == 1
  end
end
