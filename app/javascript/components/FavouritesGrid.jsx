import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchFavourites } from '../store/houses/actions';

import ApiResourceRenderer from './ApiResourceRenderer';
import HousesGridItem from './HousesGridItem';

import { houseSnippet } from '../common-prop-types';

import utilStyles from '../utility.module.css';

const FavouritesGrid = ({ data }) => {
  const items = data.map(item => (
    <HousesGridItem
      key={item.id}
      id={item.id}
      name={item.name}
      images={item.images}
      price_per_month={item.price_per_month}
    />
  ));

  return (
    <div className={utilStyles.itemsGrid}>
      {items}
    </div>
  );
};

const FavouritesGridRenderer = ({
  isLoading, data, error, fetchHouses,
}) => {
  React.useEffect(() => fetchHouses(), [fetchHouses]);

  return (
    <ApiResourceRenderer
      isLoading={isLoading || (!data && !error)}
      loaderWidth="200px"
      error={error}
      empty={!data || data.length === 0}
      render={() => (
        <FavouritesGrid data={data} />
      )}
    />
  );
};

FavouritesGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(houseSnippet)),
};

FavouritesGrid.defaultProps = {
  data: null,
};

FavouritesGridRenderer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(houseSnippet)),
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  fetchHouses: PropTypes.func.isRequired,
};

FavouritesGridRenderer.defaultProps = {
  data: null,
  error: null,
};

const mapStateToProps = state => state.houses;
const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchHouses: fetchFavourites }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesGridRenderer);
