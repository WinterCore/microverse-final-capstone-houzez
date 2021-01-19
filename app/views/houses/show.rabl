object @house => :data
attributes :id, :name, :images, :description, :price_per_month
child(:house_type) { attributes :id, :name }
node(:favourited) { @house.favourites.exists?(user_id: logged_in_user.id) }
