defmodule Blog.User.Login do
  import Blog.Hash
  import Ecto.Query

  def login(email, password) do
    find_user(email, password)
    |> assign_new_token
  end

  defp find_user(email, password) do
    hash =
      password
      |> sha256_to_hex()

    user =
      Schema.User
      |> where([user], user.email == ^email and user.password == ^hash)
      |> Blog.Repo.one()

    user.iduser
  end

  defp assign_new_token(user_id) do
    {1, [user_token]} =
      Schema.User
      |> where(iduser: ^user_id)
      |> select([user], user.cookie)
      |> Blog.Repo.update_all(set: [cookie: random_token()])

    user_token
  end
end
