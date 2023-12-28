import React from 'react'

import styles from './About.module.css'

import Header from '../../components/Header/PublicHeader'
import OrangeButton from '../../components/UI/OrangeButton/OrangeButton'
import { Link } from 'react-router-dom'

function About() {
  return (
    <>
      <Header />
      <div className={styles.container}>
          <div className={styles.imgContainer}>
            <img src='car-service-about.svg' alt='car-service-about'></img>
          </div>
          <div className={styles.textContainer}>
            <p>
              QuickFix - это современный и надежный автосервис, 
              предлагающий широкий спектр услуг для автомобилей всех марок. 
              Наша команда опытных механиков, мотористов и специалистов готова прийти на помощь в любых ситуациях. 
              Мы используем только передовое оборудование и оригинальные запчасти, чтобы обеспечить максимально качественный ремонт и обслуживание вашего автомобиля.
            </p>
            <Link to={'/services'}>
              <OrangeButton>Подробнее об услугах</OrangeButton>
            </Link>
            <ul>
              Преимущества автосервиса QuickFix:
              <li>– Быстрое и качественное выполнение работ.</li>
              <li>– Опытные и квалифицированные специалисты.</li>
              <li>– Использование оригинальных запчастей и проверенных аналогов.</li>
              <li>– Честные цены и прозрачная система оплаты.</li>
              <li>– Удобное расположение и бесплатная парковка.</li>
              <li>– Гарантия на все виды работ.</li>
            </ul>
          </div>
        </div>
    </>
  )
}

export default About