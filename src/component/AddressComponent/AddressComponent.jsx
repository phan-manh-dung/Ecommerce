import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Address.module.scss';
import classNames from 'classnames/bind';
import { apiGetPublicProvinces, apiGetPublicDistrict } from '~/service/ApisPublic';
import * as UserService from '~/service/UserService';
import { useMutationHook } from '~/hook/useMutationHook';
import Loading from '../LoadingComponent/Loading';

const cx = classNames.bind(styles);

const AddressComponent = () => {
    const [arrProvinces, setArrProvinces] = useState([]);
    const [province, setProvince] = useState();
    const [nameProvince, setNameProvince] = useState('');

    const [arrDistricts, setArrDistricts] = useState();
    const [district, setDistrict] = useState();
    const [nameDistrict, setNameDistrict] = useState('');
    const [moreAddressValue, setMoreAddressValue] = useState('');

    const [closeUpdate, setCloseUpdate] = useState(false);

    const user = useSelector((state) => state.user);

    const initial = () => ({
        address: '',
        city: '',
        moreAddress: '',
    });

    const [stateUserDetails, setStateUserDetails] = useState(initial());

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
            address: nameDistrict,
            city: nameProvince,
        }));
    }, [nameProvince, nameDistrict, moreAddressValue]);

    const mutationUpdate = useMutationHook((data) => {
        const { id, token, ...rests } = data;
        const res = UserService.updateUser(id, { ...rests }, token);
        return res;
    });

    const {
        data: dataUpdated,
        isLoading: isLoadingUpdated,
        isSuccess: isSuccessUpdated,
        isError: isErrorUpdated,
    } = mutationUpdate;

    const onUpdateUser = () => {
        mutationUpdate.mutate(
            { id: user?.id, token: user?.access_token, ...stateUserDetails },
            {
                // onSettled: () => {
                //     user?.id.refetch();
                // },
            },
        );
    };

    const handleChangeMoreAddress = (e) => {
        const values = e.target.value;
        setMoreAddressValue(values);
    };

    useEffect(() => {
        if (isSuccessUpdated) {
            setCloseUpdate(true);
        }
    }, [isSuccessUpdated]);

    return (
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
                    <textarea style={{ width: '50%', height: '40px' }} onChange={handleChangeMoreAddress}></textarea>
                </div>
                <div className={cx('button_address')} closeUpdate>
                    <button onClick={onUpdateUser}>Giao đến địa chỉ này</button>
                </div>
            </div>
        </Loading>
    );
};

export default AddressComponent;
