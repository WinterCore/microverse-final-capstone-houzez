class User < ApplicationRecord
  has_many :favourites
  has_many :favourited_houses, through: :favourites, source: :house

  scope :group_by_month, -> { group("date_trunc('month', created_at)") }
  scope :last_year, -> { where('created_at >= ?', (Time.zone.now - 1.year).beginning_of_year) }
end
