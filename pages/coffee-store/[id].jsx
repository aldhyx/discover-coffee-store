import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import cls from 'classnames';
import coffeeStoresData from '../../data/coffee-store.json';
import styles from '../../styles/coffee-store.module.scss';
import { fetchCoffeeStores } from '../../lib/coffee-store';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../stores/coffee-store';

export async function getStaticProps(staticProps) {
    const coffeeStores = await fetchCoffeeStores({});

    const params = staticProps.params;
    const coffeeStore = coffeeStores.find((coffeeStore) => {
        return coffeeStore.fsq_id.toString() === params.id; //dynamic id
    });

    // if (!coffeeStore) return { notFound: true };

    return {
        props: {
            coffeeStore: coffeeStore || {},
        },
    };
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores({});

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
    const {
        state: { coffeeStores },
    } = useContext(StoreContext);
    const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore);
    const router = useRouter();
    const { isFallback, query } = router;
    const { id } = query;

    useEffect(() => {
        if (Object.keys(coffeeStore).length <= 0) {
            const contextCoffeeStore = coffeeStores.find((coffeeStore) => {
                return coffeeStore.fsq_id.toString() === id;
            });
            setCoffeeStore(contextCoffeeStore);
        }
    }, [id]);

    if (isFallback) return <div>Loading...</div>;

    const { location, name, distance, imgUrl, vote } = coffeeStore;

    const onClickUpVoteHandler = () => {};

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
                    <p className={styles.text}>
                        {location?.formatted_address || ''}
                    </p>
                    <p className={styles.text}>
                        {distance ? `${distance}, to go` : ''}
                    </p>
                    <br />
                    <p className={styles.text}>{vote}</p>

                    <button
                        className={styles.upvoteButton}
                        onClick={onClickUpVoteHandler}
                    >
                        Up vote!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoffeeStore;
