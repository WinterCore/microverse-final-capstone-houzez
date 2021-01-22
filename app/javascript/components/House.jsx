import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useSnackbar } from 'notistack';

import { fetch, changeFavourite } from '../store/house/actions';
import ApiResourceRenderer from './ApiResourceRenderer';
import Button from './Button';

import { house } from '../common-prop-types';

import style from './House.module.css';

/* eslint-disable camelcase */
const House = ({
  id, name, images, price_per_month, house_type, favourited, description, changeFavouriteState,
}) => {
/* eslint-enable camelcase */
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChangeFavourite = () => {
    setIsLoading(true);
    changeFavouriteState(id, !favourited)
      .then(({ message }) => {
        setIsLoading(false);
        enqueueSnackbar(message, { variant: 'success' });
      })
      .catch(() => {
        setIsLoading(false);
        enqueueSnackbar('Something happened', { variant: 'error' });
      });
  };

  return (
    <div className={style.outerContainer}>
      <div className={style.container}>
        <Carousel showThumbs={false} showStatus={false}>
          {images.map((img, i) => <img alt={`House ${i}`} key={img} src={img} />)}
        </Carousel>
        <div className={style.content}>
          <div>
            <h1>{name}</h1>
            <div className={style.type}>
              Type:
              <Link to={`/?type=${house_type.id}`}>{house_type.name}</Link>
            </div>
            <div className={style.priceOuter}>
              <div className={style.price}>
                <span>$</span>
                { /* eslint-disable camelcase */ }
                {price_per_month.toLocaleString()}
                { /* eslint-enable camelcase */ }
              </div>
              <div>per month</div>
            </div>
            <p>{description}</p>
          </div>
          <div>
            <Button onClick={handleChangeFavourite} isLoading={isLoading} fullWidth flat>
              {
                favourited
                  ? 'Remove from Favourites'
                  : 'Add to Favourites'
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HouseRenderer = ({
  data, isLoading, error, fetchHouse, houseId, changeFavouriteState,
}) => {
  React.useEffect(() => fetchHouse(houseId), [fetchHouse, houseId]);

  return (
    <ApiResourceRenderer
      isLoading={isLoading || (!data && !error)}
      loaderWidth="200px"
      error={error}
      empty={!data || data.length === 0}
      /* eslint-disable camelcase */
      render={() => (
        <House
          id={data.id}
          name={data.name}
          images={data.images}
          price_per_month={data.price_per_month}
          house_type={data.house_type}
          favourited={data.favourited}
          description={data.description}
          changeFavouriteState={changeFavouriteState}
        />
      )}
      /* eslint-enable camelcase */
    />
  );
};

House.propTypes = PropTypes.shape(house).isRequired;

HouseRenderer.propTypes = {
  houseId: PropTypes.number.isRequired,
  data: PropTypes.shape(house),
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  fetchHouse: PropTypes.func.isRequired,
  changeFavouriteState: PropTypes.func.isRequired,
};

HouseRenderer.defaultProps = {
  data: null,
  error: null,
};

const mapStateToProps = state => state.house;
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchHouse: fetch,
  changeFavouriteState: changeFavourite,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HouseRenderer);
