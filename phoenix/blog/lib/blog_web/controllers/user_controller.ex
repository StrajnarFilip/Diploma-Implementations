defmodule BlogWeb.UserController do
  use BlogWeb, :controller
  alias Blog.User.Login, as: Login
  alias Blog.User.Register, as: Register
  plug BlogWeb.FindUser when action in [:show, :logout]

  def show(conn, _) do
    user = conn.assigns[:user]
    json(conn, %{id: user.iduser, email: user.email, role: user.role})
  end

  def login(conn, %{"email" => email, "password" => password}) do
    json(conn, %{text: Login.login(email, password)})
  end

  def register(conn, %{"email" => email, "password" => password}) do
    json(conn, Register.register(email, password))
  end

  def logout(conn, _) do
    response = Blog.User.Logout.logout(conn)
    json(conn, %{text: response})
  end
end
