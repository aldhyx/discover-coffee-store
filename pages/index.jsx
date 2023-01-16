import Head from 'next/head';
import Banner from '../components/banner';
import Card from '../components/card';
import styles from '../styles/home.module.css';
import coffeeStores from '../data/coffee-store.json';
import { fetchCoffeeStores } from '../lib/coffee-store';

export async function getStaticProps() {
    const coffeeStores = await fetchCoffeeStores();

    return {
        props: {
            coffeeStores,
        },
    };
}

export default function Home(props) {
    console.log('🚀 ~ file: index.jsx:27 ~ Home ~ props', props);
    const onClickBannerHandler = () => {
        alert('works');
    };

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
                    buttonText="View store nearby"
                    onClickBannerHandler={onClickBannerHandler}
                />

                <div className={styles.cardLayout}>
                    {props.coffeeStores.map((coffeeStore) => (
                        <Card
                            key={coffeeStore.fsq_id}
                            name={coffeeStore.name}
                            imgUrl={
                                'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                            }
                            href={`/coffee-store/${coffeeStore.fsq_id}`}
                            className={styles.card}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
