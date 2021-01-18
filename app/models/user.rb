class User < ApplicationRecord
  has_many :favourites
  has_many :favourited_houses, through: :favourites, source: :house

  def as_json(options = {})
    super({ :only => [:id, :name, :email, :picture] }.merge(options))
  end
end
