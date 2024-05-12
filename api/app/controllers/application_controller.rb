class ApplicationController < ActionController::API
    def authorize
        header = request.headers['Authorization']
        if header
            token = header.split(' ').last
            begin
                token = JWT.decode(token, ENV['APP_SECRET_KEY'], true, {algorithm: 'HS256'})
                @current_user = User.find(token[0]['user_id'])
            rescue JWT::DecodeError
                render json: {error: 'UnAuthorized', status: :unauthorized}
            end
        else
            render json: {error: 'UnAuthorized', status: :unauthorized}
        end
    end
end
