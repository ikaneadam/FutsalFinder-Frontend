import api from './api';

const URLS = {
    getAddressUrl: '/address/get-address-query',
    getAddressPredictionsUrl: '/search-predictions',
};

export const getAddress = async (addressQuery: string) => {
    return api.post(URLS.getAddressUrl, { query: addressQuery });
};

export const getAddressPredictions = async (addressQuery: string, config: any) => {
    return api.get(`${URLS.getAddressPredictionsUrl}?query=${addressQuery}`, config);
};
