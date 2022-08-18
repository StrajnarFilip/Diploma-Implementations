defmodule BlogWeb.UserController do
  use BlogWeb, :controller
  alias Blog.User.Login, as: Login

  def show do
  end

  def login(conn, %{"email" => email, "password" => password}) do
    json(conn, Login.login(email, password))
  end

  def register do
  end

  def logout do
  end
end
