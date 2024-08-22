import React, { useEffect, useState } from 'react';
import styles from '../ProductDetailComponent/ProductDetail.module.scss';

import * as ProductService from '~/service/ProductService';

import classNames from 'classnames/bind';
import io from 'socket.io-client';
import { StarFilled } from '@ant-design/icons';
import moment from 'moment';
const cx = classNames.bind(styles);
const socket = io('http://localhost:4000');

const arrImageWeb = {
  userProfile: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722417841/zjkrkm4wfjluknxugy8d.png',
  cmt: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722417841/k7o7nwfirw7yrbygykqx.png',
  like: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722417841/rzpugtjvwx5drqrnmnmv.png',
  binhluan: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722417841/lofgnpj6vvt1d9huk64s.png',
  chiase: 'https://res.cloudinary.com/ds3jorj8m/image/upload/v1722417841/jepgvdjstv41d1we8g67.png',
};

const ReviewComponent = ({ userId, productId }) => {
  const [showSocket, setShowSocket] = useState(true);
  const [commentsSocket, setCommentsSocket] = useState([]);
  const [commentsDatabase, setCommentsDatabase] = useState([]);

  //lưu dữ liệu mới socket vào localStore
  useEffect(() => {
    socket.on('newComment', (newComment) => {
      if (newComment.userId !== userId) {
        setCommentsSocket((prevComments) => {
          const updatedComments = [newComment, ...prevComments];
          localStorage.setItem('commentsSocket', JSON.stringify(updatedComments));
          return updatedComments;
        });
        setShowSocket(true);
      }
    });

    return () => {
      socket.off('newComment');
    };
  }, [userId]);

  // lấy dữ liệu từ local và db khi tải lại
  const fetchComments = async () => {
    try {
      if (productId) {
        const response = await ProductService.getVoteDetail(productId);
        if (response.status === 'OK') {
          setCommentsDatabase(response?.data);
        }
      } else {
        console.log('Waiting...');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem('commentsSocket')) || [];
    setCommentsSocket(savedComments);

    if (savedComments.length === 0) {
      fetchComments();
    }
  }, [productId]);

  return (
    <div>
      {/* phần show đánh giá sản phẩm socket */}
      <div>
        {showSocket &&
          commentsSocket?.map((item, index) => (
            <div key={item?.data?._id} className={cx('review_comment')}>
              <div className={cx('review_user')}>
                <div className={cx('user_inner')}>
                  <div className={cx('user_avatar')}>
                    <div>
                      <img
                        loading="lazy"
                        style={{ margin: '0 8px 0 0' }}
                        alt=""
                        src={arrImageWeb.userProfile || item?.data?.avatarUser}
                        width={40}
                        height={40}
                      />
                    </div>
                  </div>
                  <div className={cx('wrapper_avatar')}>
                    <div className={cx('user_name')}>{item?.data?.nameUser}</div>
                    <div className={cx('user_date')}>Đã tham gia</div>
                  </div>
                </div>
                <div className={cx('user_info')}>
                  <div>
                    <img
                      loading="lazy"
                      style={{ margin: '0 8px 0 0' }}
                      alt=""
                      src={arrImageWeb.cmt}
                      width={20}
                      height={20}
                    />
                    Đã viết
                  </div>
                  <span>0 đánh giá</span>
                </div>
                <div
                  style={{
                    border: '0.5px solid rgb(235, 235, 240)',
                    marginTop: '9px',
                  }}
                ></div>
                <div className={cx('user_info')}>
                  <div>
                    <img
                      loading="lazy"
                      style={{ margin: '0 8px 0 0' }}
                      alt=""
                      src={arrImageWeb.like}
                      width={20}
                      height={20}
                    />
                    Đã nhận
                  </div>
                  <span>Cảm ơn</span>
                </div>
                <div></div>
              </div>
              <div className={cx('review_vote')}>
                <div className={cx('rating_title')}>
                  <div>
                    {Array.from({ length: 5 }, (_, index) => (
                      <StarFilled
                        key={index}
                        style={{
                          width: 20,
                          height: 20,
                          color: index < item?.data?.rating ? 'gold' : 'grey',
                        }}
                      />
                    ))}
                  </div>
                  <div className={cx('rating_content')}>
                    {item?.data?.rating === 5
                      ? 'Cực kì hài lòng'
                      : item?.data?.rating === 4
                      ? 'Hài lòng'
                      : item?.data?.rating === 3
                      ? 'Bình thường'
                      : item?.data?.rating === 2
                      ? 'Tệ'
                      : item?.data?.rating === 1
                      ? 'Quá tệ'
                      : ''}
                  </div>
                </div>
                <div className={cx('seller_name-attribute')}>
                  <div className={cx('seller-name')}>
                    <span>Đã mua hàng</span>
                  </div>
                </div>

                <div className={cx('comment_content')}>
                  <div className={cx('')}>
                    <span>{item?.data?.comment}</span>
                  </div>
                </div>

                <div className={cx('review_images')}>
                  <img loading="lazy" alt="" src={item?.data?.images} width={77} height={77} />
                </div>
                <div className={cx('create_date')}>
                  <div className={cx('comment_attribute')}>
                    <div className={cx('item')}>
                      <span>Reviewed {moment(item?.data?.createdAt).fromNow(true)} ago</span>
                    </div>
                  </div>
                </div>
                <div className={cx('comment_share')}>
                  <div className={cx('wrapper_like')}>
                    <span className={cx('like_span')}>
                      <img loading="lazy" alt="" src={arrImageWeb.like} width={24} height={24} />
                      <span>1</span>
                    </span>
                    <span className={cx('reply_span')}>
                      <img loading="lazy" alt="" src={arrImageWeb.binhluan} width={24} height={24} />
                      Bình luận
                    </span>
                  </div>
                  <div className={cx('wrapper_share')}>
                    <img loading="lazy" alt="" src={arrImageWeb.chiase} width={24} height={24} />
                    Chia sẻ
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* phần show trong database */}
      <div>
        <div>
          {showSocket &&
            Array.isArray(commentsDatabase) &&
            commentsDatabase.map((item) => (
              <div key={item._id} className={cx('review_comment')}>
                <div className={cx('review_user')}>
                  <div className={cx('user_inner')}>
                    <div className={cx('user_avatar')}>
                      <div>
                        <img
                          loading="lazy"
                          style={{ margin: '0 8px 0 0' }}
                          alt=""
                          src={item?.avatarUser || arrImageWeb.userProfile}
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>
                    <div className={cx('wrapper_avatar')}>
                      <div className={cx('user_name')}>{item.nameUser}</div>
                      <div className={cx('user_date')}>Đã tham gia</div>
                    </div>
                  </div>
                  <div className={cx('user_info')}>
                    <div>
                      <img
                        loading="lazy"
                        style={{ margin: '0 8px 0 0' }}
                        alt=""
                        src={arrImageWeb.cmt}
                        width={20}
                        height={20}
                      />
                      Đã viết
                    </div>
                    <span>0 đánh giá</span>
                  </div>
                  <div
                    style={{
                      border: '0.5px solid rgb(235, 235, 240)',
                      marginTop: '9px',
                    }}
                  ></div>
                  <div className={cx('user_info')}>
                    <div>
                      <img
                        loading="lazy"
                        style={{ margin: '0 8px 0 0' }}
                        alt=""
                        src={arrImageWeb.like}
                        width={20}
                        height={20}
                      />
                      Đã nhận
                    </div>
                    <span>Cảm ơn</span>
                  </div>
                  <div></div>
                </div>
                <div className={cx('review_vote')}>
                  <div className={cx('rating_title')}>
                    <div>
                      {Array.from({ length: 5 }, (_, index) => (
                        <StarFilled
                          key={index}
                          style={{
                            width: 20,
                            height: 20,
                            color: index < item.rating ? 'gold' : 'grey',
                          }}
                        />
                      ))}
                    </div>
                    <div className={cx('rating_content')}>
                      {item?.rating === 5
                        ? 'Cực kì hài lòng'
                        : item?.rating === 4
                        ? 'Hài lòng'
                        : item?.rating === 3
                        ? 'Bình thường'
                        : item?.rating === 2
                        ? 'Tệ'
                        : item?.rating === 1
                        ? 'Quá tệ'
                        : ''}
                    </div>
                  </div>
                  <div className={cx('seller_name-attribute')}>
                    <div className={cx('seller-name')}>
                      <span>Đã mua hàng</span>
                    </div>
                  </div>
                  <div className={cx('comment_content')}>
                    <div className={cx('')}>
                      <span>{item.comment}</span>
                    </div>
                  </div>

                  <div className={cx('review_images')}>
                    <img loading="lazy" alt="" src={item.images} width={77} height={77} />
                  </div>
                  <div className={cx('create_date')}>
                    <div className={cx('comment_attribute')}>
                      <div className={cx('item')}>
                        <span>Reviewed {moment(item.createdAt).fromNow(true)} ago</span>
                      </div>
                    </div>
                  </div>
                  <div className={cx('comment_share')}>
                    <div className={cx('wrapper_like')}>
                      <span className={cx('like_span')}>
                        <img loading="lazy" alt="" src={arrImageWeb.like} width={24} height={24} />
                        <span>1</span>
                      </span>
                      <span className={cx('reply_span')}>
                        <img loading="lazy" alt="" src={arrImageWeb.binhluan} width={24} height={24} />
                        Bình luận
                      </span>
                    </div>
                    <div className={cx('wrapper_share')}>
                      <img loading="lazy" alt="" src={arrImageWeb.chiase} width={24} height={24} />
                      Chia sẻ
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
