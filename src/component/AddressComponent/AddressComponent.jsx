import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Address.module.scss';
import classNames from 'classnames/bind';
import { apiGetPublicProvinces, apiGetPublicDistrict } from '~/service/ApisPublic';
import * as UserService from '~/service/UserService';
import { useMutationHook } from '~/hook/useMutationHook';
import Loading from '../LoadingComponent/Loading';
import ModalComponent from '../ModalComponent/ModalComponent';
import { Radio } from 'antd';
import { updateUserAddress } from '~/redux/slide/userSlide';

const cx = classNames.bind(styles);

const AddressComponent = ({ onSuccess, showAddressModal, handleCloseAddressModal }) => {
  const user = useSelector((state) => state.user);

  const [arrProvinces, setArrProvinces] = useState([]);
  const [province, setProvince] = useState();
  const [nameProvince, setNameProvince] = useState('');

  const [arrDistricts, setArrDistricts] = useState();
  const [district, setDistrict] = useState();
  const [nameDistrict, setNameDistrict] = useState('');

  const [moreAddressValue, setMoreAddressValue] = useState('');
  const [value, setValue] = useState(null);
  const [showOtherInfo, setShowOtherInfo] = useState(false);

  const onChangeInputAddress = (e) => {
    const valueEnd = e.target.value;
    setValue(valueEnd);

    if (valueEnd === 'other') {
      setShowOtherInfo(true);
    } else if (valueEnd === 'other2') {
      setShowOtherInfo(true);
    } else {
      setShowOtherInfo(false);
    }
  };

  const initial = () => ({
    district: '',
    city: '',
    moreAddress: '',
  });

  const [stateUserDetails, setStateUserDetails] = useState(initial());

  // đang lỗi api

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setArrProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
  }, []);

  useEffect(() => {
    const fetPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province);
      if (response.status === 200) {
        setArrDistricts(response?.data.results);
      }
    };

    province && fetPublicDistrict(province);
  }, [province]);

  useEffect(() => {
    const selectedProvince = arrProvinces.find((item) => item?.province_id === province);
    if (selectedProvince) {
      setNameProvince(selectedProvince.province_name);
    }
  }, [province, arrProvinces]);

  useEffect(() => {
    if (district && arrDistricts && arrDistricts.length > 0) {
      const selectedDistrict = arrDistricts.find((item) => item?.district_id === district);
      if (selectedDistrict) {
        setNameDistrict(selectedDistrict.district_name);
      }
    } else {
      setNameDistrict('');
    }
  }, [district, arrDistricts]);

  useEffect(() => {
    setStateUserDetails((prevState) => ({
      ...prevState,
      moreAddress: moreAddressValue,
      district: nameDistrict,
      city: nameProvince,
    }));
  }, [nameProvince, nameDistrict, moreAddressValue]);

  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const dispatch = useDispatch();
  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;

  const onUpdateUser = () => {
    if (!district || !province) {
      alert('Bạn chưa chọn thông tin');
    } else {
      mutationUpdate.mutate(
        { id: user?.id, token: user?.access_token, ...stateUserDetails },
        {
          onSuccess: () => {
            dispatch(updateUserAddress({ id: user?.id, token: user?.access_token, ...stateUserDetails }));
            onSuccess('Địa chỉ đã được cập nhật');
          },
          onError: (error) => {
            console.error('Error updating user:', error);
            // Xử lý lỗi nếu cần
          },
        },
      );
    }
  };

  const handleChangeMoreAddress = (e) => {
    const values = e.target.value;
    setMoreAddressValue(values);
  };

  const handleCancelDelete = () => {
    handleCloseAddressModal();
  };

  useEffect(() => {
    if (mutationUpdate.isSuccess) {
      handleCloseAddressModal();
    }
  }, [mutationUpdate.isSuccess]);

  return (
    <ModalComponent title="" open={showAddressModal} onCancel={handleCancelDelete} footer={null}>
      <div className={cx('wrapper_address-modal')}>
        <div className={cx('wrapper-title')}>
          <p>Địa chỉ giao hàng</p>
        </div>
        <div style={{ backgroundColor: 'rgb(248, 248, 248)', padding: '4px', borderRadius: '6px' }}>
          <div className={cx('location')}>
            <p>
              Hãy chọn địa chỉ nhận hàng để được dự báo thời gian giao hàng cùng phí đóng gói, vận chuyển một cách chính
              xác nhất.
            </p>
            <div>
              {(user?.district || user?.city) && (
                <div className={cx('check_group')}>
                  <Radio.Group onChange={onChangeInputAddress} value={value}>
                    <p>
                      <Radio value={user.district && user.city} checked={value === user.district || user.city}>
                        {user.moreAddress},{user.district},{user.city}
                      </Radio>
                    </p>
                    <p>
                      <Radio value="other">Chọn khu vực giao hàng khác</Radio>
                    </p>
                  </Radio.Group>
                </div>
              )}
              {user?.district || user?.city ? (
                <div></div>
              ) : (
                <div onClick={onChangeInputAddress} style={{ padding: '5px 0' }}>
                  <Radio.Group>
                    <p>
                      <Radio value="other2">Thêm địa chỉ giao hàng khác</Radio>
                    </p>
                  </Radio.Group>
                </div>
              )}

              {showOtherInfo && (
                <div>
                  <Loading isLoading={isLoadingUpdated}>
                    <div className={cx('wrapper_more-info')}>
                      <div className={cx('row')}>
                        <p>Tỉnh\Thành phố (*)</p>
                        <select
                          type="province"
                          value={province}
                          className="tinh"
                          onChange={(e) => setProvince(e.target.value)}
                        >
                          <option value="">---</option>
                          {arrProvinces?.map((item) => (
                            <option key={item?.province_id} value={item?.province_id}>
                              {item?.province_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className={cx('row')}>
                        <p>Quận\Huyện (*)</p>
                        <select
                          value={district}
                          className="huyen"
                          type="district"
                          disabled={!province}
                          onChange={(e) => setDistrict(e.target.value)}
                        >
                          <option value="">---</option>
                          {arrDistricts?.map((item) => (
                            <option key={item?.district_id} value={item?.district_id}>
                              {item?.district_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className={cx('row')}>
                        <p>Địa chỉ số nhà</p>
                        <textarea
                          style={{ width: '50%', height: '40px' }}
                          onChange={handleChangeMoreAddress}
                        ></textarea>
                      </div>
                      <div className={cx('button_address')}>
                        <button onClick={onUpdateUser}>Giao đến địa chỉ này</button>
                      </div>
                    </div>
                  </Loading>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ModalComponent>
  );
};

export default AddressComponent;
