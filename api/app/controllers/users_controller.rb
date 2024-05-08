class UsersController < ApplicationController
  before_action :authorize, except: [:create, :checkUserNameExists]

  def checkUserNameExists
    username = User.find(params[:username])
    if username
      render json: { error: 'Username already exists' }
    else
      render json: { message: 'Username available' }
    end
  end

  def create
    user = User.create(user_params)
    if user.valid?
      user = user
      token = JWT.encode({user_id: user.id}, ENV['APP_SECRET_KEY'], 'HS256')
      render json: {user: user, token: token}
    else
        render json: {errors: user.error.full_messages}
    end
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
    render json: user
  end

  def show
    user = User.find(params[:id])
    render json: user
  end


  def delete
    user = User.find(params[:id])
    user.destroy
  end

  private
  def user_params
    params.require(:user).permit(:name, :username, :email, :dob, :gender, :password_digest)
  end
end
