require 'rails_helper'

RSpec.describe House, type: :model do
  describe 'Associations' do
    it { should have_many(:favourites) }
    it { should have_many(:favouritors).through(:favourites).source(:user) }

    it { should belong_to(:house_type) }
  end
end
