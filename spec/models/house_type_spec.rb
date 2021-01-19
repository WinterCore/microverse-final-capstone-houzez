require 'rails_helper'

RSpec.describe HouseType, type: :model do
  describe 'Associations' do
    it { should have_many(:houses) }
  end
end
