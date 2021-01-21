import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetch, changeFavourite} from '../store/house/actions';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {useSnackbar} from 'notistack';

import ApiResourceRenderer from './ApiResourceRenderer';
import Button from './Button';

import {house} from '../common-prop-types';

import style from './House.module.css';

const House = ({ id, name, images, price_per_month, house_type, favourited, description, changeFavouriteState }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChangeFavourite = () => {
    setIsLoading(true);
    changeFavouriteState(id, !favourited)
      .then(({ message }) => {
        setIsLoading(false);
        enqueueSnackbar(message, { variant: 'success' })
      })
      .catch(() => {
        setIsLoading(false);
        enqueueSnackbar('Something happened', { variant: 'error' })
      });
  };

  return (
    <div className={style.outerContainer}>
      <div className={style.container}>
        <Carousel showThumbs={false} showStatus={false}>
          {images.map(img => <img key={img} src={img} />)}
        </Carousel>
        <div className={style.content}>
          <div>
            <h1>{name}</h1>
            <div className={style.type}>Type: <Link to={`/?type=${house_type.id}`}>{house_type.name}</Link></div>
            <div className={style.priceOuter}>
              <div className={style.price}><span>$</span>{price_per_month}</div>
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

const HouseRenderer = ({ data, isLoading, error, fetchHouse, houseId, changeFavouriteState }) => {
  React.useEffect(() => fetchHouse(houseId), [fetchHouse, houseId]);

  return (
    <ApiResourceRenderer
      isLoading={isLoading || (!data && !error)}
      loaderWidth="200px"
      error={error}
      empty={!data || data.length === 0}
      render={() => (
        <House
          {...data}
          changeFavouriteState={changeFavouriteState}
        />
      )}
    />
  );
};

House.propTypes = PropTypes.shape(house).isRequired;

HouseRenderer.propTypes = {
  houseId: PropTypes.number.isRequired,
  data: PropTypes.shape(house),
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = (state) => state.house;
const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchHouse: fetch,
  changeFavouriteState: changeFavourite
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HouseRenderer);
