import React from 'react'
import { Link } from 'react-router-dom';

import styles from './Main.module.css'

import Header from '../../components/Header/PublicHeader'
import OrangeButton from '../../components/UI/OrangeButton/OrangeButton';

function Main() {
  return (
    <>
        <Header />
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <img src='car-service-main.svg' alt='car-service-main'></img>
          </div>
          <div className={styles.textContainer}>
            <span>
              <h1>QuickFix - надежный выбор для быстрого ремонта</h1>
              <h4>Быстро. Качественно. Надежно.</h4>
            </span>
            <Link to={'/about'}>
              <OrangeButton>Узнать подробнее</OrangeButton>
            </Link>
          </div>
        </div>
    </>
  );
}

export default Main;