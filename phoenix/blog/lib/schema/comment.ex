defmodule Schema.Comment do
  use Ecto.Schema
  @primary_key {:idcomment, :id, []}

  schema "comment" do
    field :content, :string
    field :post_idpost, :integer
    field :user_iduser, :integer
  end
end
