require 'rails_helper'

RSpec.describe BoardUser, type: :model do
  it { is_expected.to belong_to(:board) }
  it { is_expected.to belong_to(:user) }
end
