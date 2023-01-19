import Head from 'next/head';
import Banner from '../components/banner';
import Card from '../components/card';
import styles from '../styles/home.module.css';
import { fetchCoffeeStores } from '../lib/coffee-store';
import useLocation from '../hooks/useLocation';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../stores/coffee-store';

export async function getStaticProps() {
    const coffeeStores = await fetchCoffeeStores({});

    return {
        props: {
            coffeeStores,
        },
    };
}

export default function Home(props) {
    const { error, getLatlng, latlng, loading } = useLocation();
    const {
        state: { coffeeStores },
        setInitialState,
    } = useContext(StoreContext);

    useEffect(() => {
        if (!latlng.lat || !latlng.lng) return;

        fetchCoffeeStores({
            limit: 12,
            latlng: `${latlng.lat.toString()},${latlng.lng.toString()}`,
        }).then((data) => {
            setInitialState((prev) => ({ ...prev, coffeeStores: data }));
        });
    }, [latlng]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Nearby Coffee Store: Coffee Connoisseur</title>
                <meta
                    name="description"
                    content="Find the best coffee store around you at coffee connoisseur"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Banner
                    buttonText={loading ? 'Locating...' : 'View store nearby'}
                    onClickBannerHandler={() => getLatlng()}
                />

                {error && <span>{error}</span>}

                {coffeeStores && coffeeStores.length > 0 && (
                    <div>
                        <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>
                            Coffee store near me
                        </h2>
                        <div className={styles.cardLayout}>
                            {coffeeStores.map((coffeeStore) => (
                                <Card
                                    key={coffeeStore.fsq_id}
                                    name={coffeeStore.name}
                                    imgUrl={coffeeStore.imgUrl}
                                    href={`/coffee-store/${coffeeStore.fsq_id}`}
                                    className={styles.card}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {props.coffeeStores && props.coffeeStores.length > 0 && (
                    <div>
                        <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>
                            Recent coffee store
                        </h2>
                        <div className={styles.cardLayout}>
                            {props.coffeeStores.map((coffeeStore) => (
                                <Card
                                    key={coffeeStore.fsq_id}
                                    name={coffeeStore.name}
                                    imgUrl={coffeeStore.imgUrl}
                                    href={`/coffee-store/${coffeeStore.fsq_id}`}
                                    className={styles.card}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
