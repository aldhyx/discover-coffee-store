import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import cls from 'classnames';
import coffeeStoresData from '../../data/coffee-store.json';
import styles from '../../styles/coffee-store.module.scss';
import { fetchCoffeeStores } from '../../lib/coffee-store';

export async function getStaticProps(staticProps) {
    const coffeeStores = await fetchCoffeeStores();

    const params = staticProps.params;
    return {
        props: {
            coffeeStore: coffeeStores.find((coffeeStore) => {
                return coffeeStore.fsq_id.toString() === params.id; //dynamic id
            }),
        },
    };
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores();

    const paths = coffeeStores.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.fsq_id.toString(),
            },
        };
    });
    return {
        paths,
        fallback: true,
    };
}

const CoffeeStore = (props) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const { location, name, distance, imgUrl } = props.coffeeStore;

    const handleUpvoteButton = () => {};

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>

            <div className={styles.container}>
                <div className={styles.backToHomeLink}>
                    <Link href="/">Back to home</Link>
                </div>

                <div className={styles.nameWrapper}>
                    <h1>{name}</h1>
                </div>

                <div className={styles.storeImgWrapper}>
                    <Image
                        src={
                            imgUrl ||
                            'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                        }
                        width={600}
                        height={360}
                        alt={name}
                    />
                </div>

                <div className={`glass-no-hover ${styles.card}`}>
                    <p className={styles.text}>{location.formatted_address}</p>
                    <p className={styles.text}>{distance}m to go</p>
                    <br />
                    <p className={styles.text}>1</p>

                    <button
                        className={styles.upvoteButton}
                        onClick={handleUpvoteButton}
                    >
                        Up vote!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoffeeStore;
