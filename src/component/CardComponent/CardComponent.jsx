import { Card } from 'antd';
import React from 'react';
import Meta from 'antd/es/card/Meta';
import { StarFilled } from '@ant-design/icons';
import laptop1 from '../../assets/img_products/laptop1.png';
import img_now from '../../assets/img_Global/now.png';
import img_genuine from '../../assets/img_Global/genuine.png';

import styles from './Card.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const CardComponent = () => {
    return (
        <div>
            <Card
                hoverable
                bodyStyle={{ padding: '10px' }}
                style={{ width: 167, marginRight: '10px' }}
                cover={<img alt="laptop1" src={laptop1} />}
            >
                <div className={cx('genuine')}>
                    <img alt="genuine" src={img_genuine} width={89} height={20} />
                </div>
                <div className={cx('product_name')}>
                    Laptop LG Gram 2023 14ZD90R-G.AX52A5 (i5-1340P | 8GB | 256GB | 14) Hàng chính hãng
                </div>
                <div className={cx('product_sold')}>
                    4 <StarFilled style={{ fontSize: '10px', color: '#ffce3d' }} /> | Đã bán
                </div>
                <div className={cx('product_wrapper-price')}>
                    <div className={cx('product_price')}>23.450.000</div>

                    <div className={cx('product_discount')}>
                        <span>-30%</span>
                    </div>
                </div>
                <div className={cx('product_speed')}>
                    <img alt="now" src={img_now} width={32} height={16} />
                    <span className={cx('speed_title')}>Giao hàng siêu tốc</span>
                </div>
            </Card>
        </div>
    );
};

export default CardComponent;
