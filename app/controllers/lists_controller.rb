class ListsController < ApplicationController
  before_action :authenticate_user!

  def new
    @list = board.lists.new
  end

  private

  def board
    @board ||= Board.find(params[:board_id])
  end
end