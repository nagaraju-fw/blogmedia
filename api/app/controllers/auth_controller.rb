class AuthController < ApplicationController

  def login
    puts Rails.application.config

    user = User.find_by(email: login_params[:email])
    if user && user.authenticate(login_params[:password])
      token = JWT.encode({user_id: user.id}, ENV['APP_SECRET_KEY'], 'HS256')
      render json: {user: user, token: token}
    else
      render json: {errors: user.errors.full_messages}
    end
  end

  # def persist
  #   if request.headers['Authorization']
  #     encoded_token = request.headeres['Authorization'].split(' ')[1]
  #     token = JWT.decode(encoded_token, secret)
  #     user_id = token[0]['user_id']
  #     user = User.find(user_id)
  #     render json: user
  #   end
  # end

  def login_params
    params.permit(:email, :password)
  end
end
