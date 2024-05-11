class UsersController < ApplicationController
  before_action :authorize, except: [:create, :checkUserNameExists]

  def checkUserNameExists
    username = User.where("username = ?", params[:username]).first
    if username
      render json: { error: 'Username already exists', exists: true }
    else
      render json: { error: 'Username available', exists: false }
    end
  end

  def create
    user = User.create(user_params)
    if user.valid?
      user = user
      token = JWT.encode({user_id: user.id}, ENV['APP_SECRET_KEY'], 'HS256')
      render json: {user: user, token: token}
    else
        render json: {errors: user.errors.full_messages}
    end
  end

  def update
    user = User.find(params[:id])
    user.update(user_update_params)
    render json: user
  end

  def show
    user = User.find(params[:id])
    render json: {user: user}
  end

  def delete
    user = User.find(params[:id])
    user.destroy
  end

  def validate
    header = request.headers['Authorization']
    if header
      token = header.split(' ').last
      begin
        token = JWT.decode(token, ENV['APP_SECRET_KEY'], true, {algorithm: 'HS256'})
        user = User.find(token[0]['user_id'])
        render json: {user: user}
      rescue JWT::DecodeError
        render json: {error: 'UnAuthorized', status: :unauthorized}
      end
    end
  end

  private

  def user_update_params
    params.require(:user).permit(:name, :dob, :gender)
  end

  def user_params
    params.require(:user).permit(:name, :username, :email, :dob, :gender, :password)
  end
end
