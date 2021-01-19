class House < ApplicationRecord
  belongs_to :house_type
  has_many :favouritors, through: :favourites, source: :user
  has_many :favourites

  scope :belong_to_type, lambda { |type| where(house_type_id: type) unless type.nil? }
end
