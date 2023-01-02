import Head from 'next/head';
import Banner from '../components/banner';
import Card from '../components/card';
import styles from '../styles/home.module.css';
import coffeeStores from '../data/coffee-store.json';

export async function getStaticProps() {
    return {
        props: {
            coffeeStores,
        },
    };
}

export default function Home(props) {
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
                            key={coffeeStore.id}
                            name={coffeeStore.name}
                            imgUrl={coffeeStore.imgUrl}
                            href={`/coffee-store/${coffeeStore.id}`}
                            className={styles.card}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
