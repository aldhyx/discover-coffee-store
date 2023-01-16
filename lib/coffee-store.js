import { createApi } from 'unsplash-js';

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getCoffeeStoreUrl = ({ latlng, query, limit }) =>
    `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlng}&limit=${limit}`;

const getPhotos = async () => {
    const { response } = await unsplash.search.getPhotos({
        page: 1,
        page: 20,
        query: 'coffee cafe',
    });

    return response.results;
};

export const fetchCoffeeStores = async () => {
    const photos = await getPhotos();

    const res = await fetch(
        getCoffeeStoreUrl({
            latlng: '-10.175285%2C123.607394',
            limit: 6,
            query: 'coffee',
        }),
        {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: process.env.FOURSQUARE_API_KEY,
            },
        }
    );

    let { results } = await res.json();

    results = results.map((result, i) => {
        return {
            ...result,
            imgUrl: photos[i].urls.small,
        };
    });

    return results;
};
