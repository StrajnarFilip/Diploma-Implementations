defmodule Blog.Segment.ShowPostSegments do
  import Ecto.Query

  def segments_of_post(post_id) do
    Schema.Segment
    |> where([segment], segment.post_idpost == ^post_id)
    |> select([segment], %{
      idsegment: segment.idsegment,
      postIdpost: segment.post_idpost,
      type: segment.type,
      text: segment.text,
      source: segment.source
    })
    |> Blog.Repo.all()
  end
end
