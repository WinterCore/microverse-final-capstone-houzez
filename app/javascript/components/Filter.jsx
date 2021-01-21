import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import { fetch } from '../store/house-types/actions';

import { houseType } from '../common-prop-types';

import style from './Filter.module.css';
import utilStyle from '../utility.module.css';

const Filter = ({
  error, isLoading, data, fetchHouseTypes, location,
}) => {
  React.useEffect(() => fetchHouseTypes(), [fetchHouseTypes]);

  const typeParam = (+queryString.parse(location.search).type) || null;

  if (error) {
    return (
      <h2 className={utilStyle.errorHeading}>Something happened while fetching the filters!</h2>
    );
  }

  if (isLoading || !data) {
    return null;
  }

  const items = [{ id: null, name: 'All' }, ...data];

  return (
    <div className={style.container}>
      {
        items.map(({ id, name }) => (
          <Link
            to={id === -1 ? '/' : `/?type=${id}`}
            className={
              classnames(
                style.badge,
                utilStyle.badge,
                { [utilStyle.active]: id === typeParam },
              )
            }
            key={id}
          >
            {name}
          </Link>
        ))
      }
    </div>
  );
};

Filter.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(houseType)),
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  fetchHouseTypes: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

Filter.defaultProps = {
  data: null,
  error: null,
};

const mapStateToProps = state => state.houseTypes;
const mapDispatchToProps = dispatch => bindActionCreators({ fetchHouseTypes: fetch }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Filter));
