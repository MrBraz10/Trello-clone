class ListSerializer
  include JSONAPI::Serializer
  attributes :title

  attribute :items do |object|
    ItemSerializer.new(object.items).serializable_hash
    end
end
