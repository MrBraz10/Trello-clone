class AddPositionToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :position, :integer, null: true, default: 0
  end
end
