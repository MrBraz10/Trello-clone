require "rails_helper"

RSpec.describe "Api::Lists", type: :request do
  let(:user) { create(:user) }
  let(:board) { create(:board, user: user) }
  let!(:list) { create_list(:list, 3, board: board) }

  describe "GET index" do
    it "succeeds" do
      get api_board_lists_path(board)
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)["data"].size).to eq(3)
    end
  end
end
