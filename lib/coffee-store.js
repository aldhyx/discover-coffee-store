import { createApi } from 'unsplash-js';

const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getCoffeeStoreUrl = ({ latlng, query, limit }) =>
    `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlng}&limit=${limit}`;

const getPhotos = async ({ limit }) => {
    const { response } = await unsplash.search.getPhotos({
        page: 1,
        perPage: limit,
        query: 'coffee cafe',
    });

    return response.results;
};

export const fetchCoffeeStores = async ({ limit, query, latlng }) => {
    const photos = await getPhotos({ limit });

    const res = await fetch(
        getCoffeeStoreUrl({
            latlng: latlng || '-10.175285%2C123.607394',
            limit: limit || 6,
            query: query || 'coffee',
        }),
        {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
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
