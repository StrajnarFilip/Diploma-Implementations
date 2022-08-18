defmodule Schema.Post do
  use Ecto.Schema
  @primary_key {:idpost, :id, []}

  schema "post" do
    field :title, :string
  end
end
