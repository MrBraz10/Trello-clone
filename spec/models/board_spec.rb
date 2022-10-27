require "rails_helper"

RSpec.describe Board, type: :model do
  it { is_expected.to belong_to :user }
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to have_many(:lists).dependent(:destroy) }
end
