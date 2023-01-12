import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import cls from 'classnames';
import coffeeStoresData from '../../data/coffee-store.json';
import styles from '../../styles/coffee-store.module.scss';

export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    return {
        props: {
            coffeeStore: coffeeStoresData.find((coffeeStore) => {
                return coffeeStore.id.toString() === params.id; //dynamic id
            }),
        },
    };
}

export function getStaticPaths() {
    const paths = coffeeStoresData.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.id.toString(),
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

    const { address, name, neighbourhood, imgUrl } = props.coffeeStore;

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
                    <Image src={imgUrl} width={600} height={360} alt={name} />
                </div>

                <div className={`glass-no-hover ${styles.card}`}>
                    <p className={styles.text}>{address}</p>
                    <p className={styles.text}>{neighbourhood}</p>
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
