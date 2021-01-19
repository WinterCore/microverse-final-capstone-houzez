object :house
attributes :id, :name, :images
child(:house_type) { attributes :id, :name }