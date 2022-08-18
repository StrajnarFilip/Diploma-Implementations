defmodule Schema.Segment do
  use Ecto.Schema
  @primary_key {:idsegment, :id, []}

  schema "segment" do
    field :post_idpost, :integer
    field :type, :string
    field :text, :string
    field :source, :string
  end
end
