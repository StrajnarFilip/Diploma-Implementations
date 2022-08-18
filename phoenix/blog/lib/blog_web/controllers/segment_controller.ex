defmodule BlogWeb.SegmentController do
  use BlogWeb, :controller

  def show_post_segments(conn, _params) do
    json(conn, Blog.Hash.sha256_to_hex(""))
  end

  def create(_conn, _params) do
  end

  def delete(_conn, _params) do
  end
end
