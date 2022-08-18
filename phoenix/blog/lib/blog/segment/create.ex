defmodule Blog.Segment.Create do
  def new_segment(params) do
    %{
      "postIdpost" => post_id,
      "type" => type,
      "text" => text,
      "source" => source
    } = params

    {:ok, created} =
      Blog.Repo.insert(%Schema.Segment{
        post_idpost: post_id,
        type: type,
        text: text,
        source: source
      })

    %{
      idsegment: created.idsegment,
      postIdpost: created.post_idpost,
      type: created.type,
      text: created.text,
      source: created.source
    }
  end
end
