const { override, useBabelRc, overrideDevServer } = require('customize-cra');
// override: Được sử dụng để ghi đè cấu hình Webpack mặc định của Create React App.
//useBabelRc: Cho phép sử dụng cấu hình Babel từ file .babelrc.
// overrideDevServer: Được sử dụng để ghi đè cấu hình DevServer mặc định của Create React App.

// hàm tạo cấu hình dev derver
const devServerConfig = () => (config) => {
    config.allowedHosts = 'all'; // all cho phép tất cả các host truy cập
    return config;
};

module.exports = {
    webpack: override(
        // cho phép sử dụng cấu hình Babel từ file .babelrc trong dự án.
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useBabelRc(),
    ),
    // devServerConfig. Điều này thiết lập allowedHosts cho DevServer theo cấu hình đã chỉ định.
    devServer: overrideDevServer(devServerConfig()),
};
