export const isJsonString = (data) => {
    try {
        JSON.parse(data);
    } catch (error) {
        return false;
    }
    return true;
};

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export const renderOptions = (arr, isType) => {
    let results = [];
    if (arr) {
        results = arr.map((opt) => ({
            value: opt,
            label: opt,
        }));
    }
    if (isType) {
        results.push({
            label: 'Thêm type',
            value: 'add_type',
        });
    } else {
        results.push({
            label: 'Thêm màu',
            value: 'add_color',
        });
    }
    return results;
};

export const convertPrice = (price) => {
    try {
        const result = price?.toLocaleString().replaceAll(',', '.');
        return result;
    } catch (error) {
        return null;
    }
};
