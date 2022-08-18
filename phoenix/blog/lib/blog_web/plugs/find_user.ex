defmodule BlogWeb.FindUser do
  import Plug.Conn

  def init(_options) do
    # options
  end

  def call(conn, _opts) do
    case get_req_header(conn, "authorization") do
      [token] -> assign_user(conn, token)
      _ -> conn |> send_resp(401, "No user found") |> halt()
    end
  end

  defp assign_user(conn, token) do
    user = Blog.Repo.get_by(Schema.User, cookie: token)

    conn
    |> assign(:user, user)
  end
end
