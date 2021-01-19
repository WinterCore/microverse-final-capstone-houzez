class House < ApplicationRecord
  belongs_to :house_type
  has_many :favourites
  has_many :favouritors, through: :favourites, source: :user

  scope :belong_to_type, lambda { |type| where(house_type_id: type) unless type.nil? }
end
