defmodule BlogWeb.AdminOnly do
  import Plug.Conn

  def init(_options) do
    # options
  end

  def call(conn, _opts) do
    [token] = get_req_header(conn, "authorization")

    user = Blog.Repo.get_by(Schema.User, cookie: token)

    case user.role do
      "admin" -> conn
      _ -> conn |> send_resp(401, "User is not an admin") |> halt()
    end
  end
end
