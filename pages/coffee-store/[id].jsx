import Error from 'next/error';
import { useRouter } from 'next/router';
import React from 'react';
import coffeeStores from '../../data/coffee-store.json';

export async function getStaticProps(staticProps) {
    const { params } = staticProps;
    const coffeeStore = coffeeStores.find(
        ({ id }) => id.toString() === params.id
    );

    if (!coffeeStore) return { notFound: true };

    return { props: { coffeeStore } };
}

export function getStaticPaths() {
    return {
        paths: [{ params: { id: '0' } }, { params: { id: '1' } }],
        fallback: true,
    };
}

export default function CoffeeStoreDetail(props) {
    const { coffeeStore } = props;
    const router = useRouter();
    const {
        isFallback,
        query: { id },
    } = router;

    if (isFallback) {
        return <p>Loading</p>;
    }

    return (
        <div>
            <h1>
                {coffeeStore.name} {id}
            </h1>

            <p>{coffeeStore.address}</p>
        </div>
    );
}
