import { fetchCoffeeStores } from '../../lib/coffee-store';

const getCoffeeStoresByLocation = async (req, res) => {
    try {
        const { latlng, limit, query } = req.query;
        const response = await fetchCoffeeStores({
            latlng,
            limit,
            query,
        });
        res.status(200);
        res.json(response);
    } catch (err) {
        console.error('There is an error', err);
        res.status(500);
        res.json({ message: 'Oh no! Something went wrong', err });
    }
};

export default getCoffeeStoresByLocation;
