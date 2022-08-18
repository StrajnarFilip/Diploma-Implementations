defmodule Schema.User do
  use Ecto.Schema
  @primary_key {:iduser, :id, []}

  schema "user" do
    field :email, :string
    field :password, :string
    field :cookie, :string
    field :role, :string
  end
end
