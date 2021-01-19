node(:token) { @token }
child @user => :data do
    extends 'users/show'
end