class PostsController < ApplicationController
  before_action :authorize, except: [:index, :show]
  before_action :set_post, only: [:show, :update, :destroy]


  def index
    if params[:user_id]
      posts = Post.includes(:user).where("user_id = ? and published = ?", params[:user_id], params[:published]).order('created_at DESC')
      render json: { posts: posts }
    else
      limit = params[:limit]
      posts = Post.includes(:user).where("published=1").order('created_at ASC')
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
    if @post
      render json: { post: @post }
    else
      render json: { post: null, error: "Invalid Post id" }
    end
  end

  def update
    post = Post.find(params[:id])
    post.update(post_params)
    render json: post
  end

  def destroy
    post = Post.find(params[:id])
    if post.destroy
      render json: { deleted: true }
    else
      render json: { errors: post.errors.full_messages }
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.includes(:user).find(params[:id])
    end

    def post_params
      params.require(:post).permit(:title, :content, :published, :user_id)
    end

end
