object :house
attributes :id, :name, :images, :price_per_month
child(:house_type) { attributes :id, :name }
