require 'rails_helper'

RSpec.describe House, type: :model do
  describe 'Associations' do
    it { should have_many(:favourites) }
    it { should have_many(:favouritors).through(:favourites).source(:user) }

    it { should belong_to(:house_type) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:images) }
    it { should validate_presence_of(:price_per_month) }
    it { should validate_presence_of(:house_type_id) }
    it { should validate_length_of(:name).is_at_least(3).is_at_most(255) }
    it { should validate_numericality_of(:price_per_month).is_greater_than(0) }
  end
end
