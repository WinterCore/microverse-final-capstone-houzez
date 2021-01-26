import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';

import ApiResourceRenderer from './ApiResourceRenderer';
import { fetch } from '../store/houses/actions';

import HousesGridItem from './HousesGridItem';

import utilStyles from '../utility.module.css';
import { houseSnippet } from '../common-prop-types';

const HousesGrid = ({
  data, isLoading, isLoadingMore, fetchHouses, page, houseTypeId, hasMore,
}) => {
  /* eslint-disable camelcase */
  const items = data.map(item => (
    <HousesGridItem
      key={item.id}
      id={item.id}
      name={item.name}
      images={item.images}
      price_per_month={item.price_per_month}
    />
  ));
  /* eslint-enable camelcase */
  const containerRef = React.createRef(null);
  const checkLoadMore = () => {
    if (!containerRef.current) return;
    const container = document.getElementById('scrollable');
    const { height } = containerRef.current.getBoundingClientRect();
    if (
      !isLoading
      && !isLoadingMore
      && (height - container.scrollTop) < window.innerHeight
      && hasMore
    ) {
      fetchHouses(houseTypeId, page + 1);
    }
  };

  React.useEffect(() => {
    const container = document.getElementById('scrollable');
    container.addEventListener('scroll', checkLoadMore);
    return () => container.removeEventListener('scrol', checkLoadMore);
  });

  return (
    <>
      <div ref={containerRef} className={utilStyles.itemsGrid}>
        {items}
      </div>
      { !hasMore && (
        <div className={utilStyles.infoHeading}>
          You&apos;ve reached the end!
        </div>
      )}
    </>
  );
};

const HousesGridRenderer = ({
  isLoading, data, error, isLoadingMore, fetchHouses, page, location, hasMore,
}) => {
  const type = (+queryString.parse(location.search).type) || undefined;

  React.useEffect(() => fetchHouses(type), [fetchHouses, type]);

  return (
    <ApiResourceRenderer
      isLoading={isLoading || (!data && !error)}
      loaderWidth="200px"
      error={error}
      empty={!data || data.length === 0}
      render={() => (
        <HousesGrid
          data={data}
          isLoadingMore={isLoadingMore}
          fetchHouses={fetchHouses}
          page={page}
          isLoading={isLoading}
          houseTypeId={type}
          hasMore={hasMore}
        />
      )}
    />
  );
};

HousesGridRenderer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(houseSnippet)),
  isLoading: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  error: PropTypes.string,
  fetchHouses: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

HousesGrid.propTypes = {
  ...HousesGridRenderer.propTypes,
  houseTypeId: PropTypes.number,
};

HousesGridRenderer.defaultProps = {
  data: null,
  error: null,
};

HousesGrid.defaultProps = {
  houseTypeId: null,
};

const mapStateToProps = state => state.houses;
const mapDispatchToProps = dispatch => bindActionCreators({ fetchHouses: fetch }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HousesGridRenderer));
