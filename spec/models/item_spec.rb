require "rails_helper"

RSpec.describe Item, type: :model do
  it { is_expected.to belong_to :list }
  it { is_expected.to validate_presence_of(:title) }
  it { is_expected.to have_many(:item_members).dependent(:destroy) }
  it { is_expected.to have_many(:members).through(:item_members).source(:user) }
end
