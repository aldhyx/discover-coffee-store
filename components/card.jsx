import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './card.module.scss';

export default function Card(props) {
    return (
        <Link href={props.href} className={styles.cardLink}>
            <div className={`glass ${styles.container}`}>
                <div className={styles.cardHeaderWrapper}>
                    <h2 className={styles.cardHeader}>{props.name}</h2>
                </div>
                <div className={styles.cardImageWrapper}>
                    <Image
                        className={styles.cardImage}
                        src={props.imgUrl}
                        width={260}
                        height={160}
                        alt=""
                    />
                </div>
            </div>
        </Link>
    );
}
