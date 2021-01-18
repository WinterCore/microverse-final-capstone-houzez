class House < ApplicationRecord
  belongs_to :house_type
  has_many :favouritors, through: :favourites, source: :user
end
