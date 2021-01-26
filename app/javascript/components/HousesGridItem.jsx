import React from 'react';
import { Link } from 'react-router-dom';

import { houseSnippet } from '../common-prop-types';

import style from './HousesGridItem.module.css';

/* eslint-disable camelcase */
const HousesGridItem = ({
  id, name, images, price_per_month,
}) => (
/* eslint-enable camelcase */
  <Link to={`/houses/${id}`} className={style.container}>
    <div className={style.image} style={{ backgroundImage: `url("${images[0]}` }} />
    <div className={style.footer}>
      <div>
        <h2 className={style.name}>{ name }</h2>
      </div>
      <div>
        <h3 className={style.price}>
          $
          { price_per_month.toLocaleString() }
        </h3>
        <div className={style.priceSub}>per Month</div>
      </div>
    </div>
  </Link>
);

HousesGridItem.propTypes = houseSnippet;

export default HousesGridItem;
