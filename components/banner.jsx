import React from 'react';
import styles from './banner.module.scss';

export default function Banner(props) {
    return (
        <header className={styles.container}>
            <h1 className={styles.title}>
                <span>Coffee</span> <span>Connoisseur</span>
            </h1>
            <p className={styles.subTitle}>Discover your local coffee shop</p>
            <button
                className={styles.button}
                onClick={props.onClickBannerHandler}
            >
                {props.buttonText}
            </button>
        </header>
    );
}
