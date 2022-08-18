defmodule Blog.Segment.Delete do
  def delete_segment(segment_id) do
    Blog.Repo.get(Schema.Segment, segment_id)
    |> Blog.Repo.delete()

    String.to_integer(segment_id)
  end
end
