import Head from 'next/head';
import Banner from '../components/banner';
import Card from '../components/card';
import styles from '../styles/home.module.css';

export default function Home() {
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
                    <Card
                        name="DarkHorse Coffee"
                        imgUrl="/static/cf.jpg"
                        href="/coffee-store/darkhose-coffee"
                        className={styles.card}
                    />
                    <Card
                        name="DarkHorse Coffee"
                        imgUrl="/static/cf.jpg"
                        href="/coffee-store/darkhose-coffee"
                        className={styles.card}
                    />
                    <Card
                        name="DarkHorse Coffee"
                        imgUrl="/static/cf.jpg"
                        href="/coffee-store/darkhose-coffee"
                        className={styles.card}
                    />
                </div>
            </main>
        </div>
    );
}
