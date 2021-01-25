node(:token) { @token }
child @user => :data do
  extends 'api/users/show'
end
