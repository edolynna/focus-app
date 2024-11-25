import React from 'react';
import styles from './Background.module.css';

function Background() {
    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.containerRight}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
            </div>
            <div className={styles.containerLeft}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
            </div>
        </div>
    )
}

export default Background;