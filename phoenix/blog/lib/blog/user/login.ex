defmodule Blog.User.Login do
  import Blog.Hash

  def login(email, password) do
    hash =
      password
      |> sha256_to_hex()

    
  end
end
