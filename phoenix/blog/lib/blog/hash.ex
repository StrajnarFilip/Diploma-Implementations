defmodule Blog.Hash do
  def sha256_to_hex(password) do
    :crypto.hash(:sha256, password)
    |> Base.encode16(case: :upper)
  end

  def random_token() do
    :crypto.strong_rand_bytes(32)
    |> Base.encode16(case: :upper)
  end
end
