const getCoffeeStoreUrl = ({ latlng, query, limit }) =>
    `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlng}&limit=${limit}`;

export const fetchCoffeeStores = async () => {
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

    const { results } = await res.json();

    return results;
};
