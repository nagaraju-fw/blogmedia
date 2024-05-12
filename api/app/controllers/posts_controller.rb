class PostsController < ApplicationController
  before_action :authorize, except: [:index, :show]
  before_action :set_post, only: [:show, :update, :destroy]


  def index
    if params[:user_id]
      posts = Post.where("user_id = ? and published = 1", params[:user_id])
      render json: { posts: posts }
    else
      limit = params[:limit]
      posts = Post.where("published=1").order('created_at DESC')
      if limit
        posts = posts.limit(10)
      end
      render json: { posts: posts }
    end
  end

  def create
    post = Post.create(post_params)
    if post.valid?
      render json: {post: post}
    else
      render json: {errors: post.errors.full_messages, params: post_params}
    end
  end

  def show
    if post?
      render json: {post: @post}
    else
      render json: {post: null, error: "Invalid Post id"}
    end
  end

  def update
  end

  def destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:title, :content, :published, :user_id)
    end

end
