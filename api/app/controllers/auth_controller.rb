class AuthController < ApplicationController

  def login
    if !login_params[:email] || !login_params[:password]
      render json: {error: 'Invalid input'}
    end

    user = User.find_by(email: login_params[:email])
    if user && user.authenticate(login_params[:password])
      token = JWT.encode({user_id: user.id}, ENV['APP_SECRET_KEY'], 'HS256')
      render json: {user: user, token: token}
    else
      render json: {error: 'Invalid user credentials'}
    end
  end

  def login_params
    params.permit(:email, :password)
  end
end
