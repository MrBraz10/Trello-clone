require 'rails_helper'

RSpec.describe ItemMember, type: :model do
  it { is_expected.to belong_to(:item) }
  it { is_expected.to belong_to(:user) }
end
