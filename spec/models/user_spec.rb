require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'Associations' do
    it { should have_many(:favourites) }
    it { should have_many(:favourited_houses).through(:favourites).source(:house) }
  end
end
