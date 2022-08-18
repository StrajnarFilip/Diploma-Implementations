defmodule BlogWeb.Router do
  use BlogWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {BlogWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", BlogWeb do
    pipe_through :api
    # Comments
    get "/post-comments/:post_id", CommentController, :show_post_comments
    post "/comment", CommentController, :create
    delete "/comment/:id", CommentController, :delete

    # Posts
    get "/posts", PostController, :index
    get "/post/:id", PostController, :show
    post "/post", PostController, :create
    delete "/post/:id", PostController, :delete

    # Segments
    get "/post-segments/:id", SegmentController, :show_post_segments
    post "/segment",SegmentController, :create
    delete "/segment/:id",SegmentController, :delete

    # User (authentication)
    get "/user-information", UserController, :show
    post "/login", UserController, :login
    post "/register", UserController, :register
    post "/logout", UserController, :logout
  end

  # Other scopes may use custom stacks.
  # scope "/api", BlogWeb do
  #   pipe_through :api
  # end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: BlogWeb.Telemetry
    end
  end

  # Enables the Swoosh mailbox preview in development.
  #
  # Note that preview only shows emails that were sent by the same
  # node running the Phoenix server.
  if Mix.env() == :dev do
    scope "/dev" do
      pipe_through :browser

      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
