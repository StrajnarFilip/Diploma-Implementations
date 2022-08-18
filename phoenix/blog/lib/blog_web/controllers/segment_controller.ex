defmodule BlogWeb.SegmentController do
  use BlogWeb, :controller
  plug BlogWeb.AdminOnly when action in [:create, :delete]

  def show_post_segments(conn, %{"id" => post_id}) do
    segments = Blog.Segment.ShowPostSegments.segments_of_post(post_id)
    json(conn, segments)
  end

  def create(conn, params) do
    segment = Blog.Segment.Create.new_segment(params)
    json(conn, segment)
  end

  def delete(conn, %{"id" => post_id}) do
    id = Blog.Segment.Delete.delete_segment(post_id)
    json(conn, id)
  end
end
