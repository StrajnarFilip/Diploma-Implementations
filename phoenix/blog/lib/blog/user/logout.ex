defmodule Blog.User.Logout do
  def logout(conn) do
    requesting_user = conn.assigns[:user]
    change=Ecto.Changeset.change(requesting_user,cookie: "")
    Blog.Repo.update(change)

    "Logout successfull"
  end
end
