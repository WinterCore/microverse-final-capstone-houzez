class HouseType < ApplicationRecord
  has_many :houses

  def as_json(options = {})
    super({ :only => [:id, :name] }.merge(options))
  end
end
