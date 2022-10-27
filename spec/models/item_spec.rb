require "rails_helper"

RSpec.describe Item, type: :model do
  it { is_expected.to belong_to :list }
  it { is_expected.to validate_presence_of(:title) }
end
