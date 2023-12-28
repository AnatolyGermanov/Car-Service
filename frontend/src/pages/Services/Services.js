import React, { useState } from 'react'

import styles from './Services.module.css'

import Header from '../../components/Header/PublicHeader'
import OrangeButton from '../../components/UI/OrangeButton/OrangeButton'
import Modal from '../../components/UI/Modal/Modal'
import Auth from '../../components/Auth/Auth'

function Services() {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      {
        modalVisible ? 
        <Modal setVisible={setModalVisible}>
          <Auth initAuthComponent='SignUp' setModalVisible={setModalVisible}></Auth>
        </Modal>
        : null
      }

      <Header />
      <div className={styles.container}>
          <div className={styles.imgContainer}>
            <img src='car-service-services.svg' alt='car-service-services'></img>
          </div>
          <div className={styles.textContainer}>
            <ol>
              Наши услуги включают в себя:
              <li>1. Диагностика и ремонт двигателя, топливной системы, трансмиссии и подвески.</li>
              <li>2. Замена масла и технических жидкостей.</li>
              <li>3. Регулировка развала-схождения колес.</li>
              <li>4. Шиномонтаж и балансировка колес.</li>
              <li>5. Установка дополнительного оборудования и аксессуаров.</li>
              <li>6. Предпродажная подготовка автомобиля.</li>
              <li>7. Консультация по вопросам эксплуатации и обслуживания автомобиля.</li>
              <li>8. И многое другое...</li>
            </ol>
            <div className={styles.smallContainer}>
              <p>Регистрируйтесь и  отслеживайте ремонт автомобиля онлайн.</p>
              <OrangeButton onClick={() => setModalVisible(true)}>Регистрация</OrangeButton>
            </div>
            <div className={styles.smallContainer}>
              <p>Возникли вопросы? Свяжитесь с нами.</p>
              <span className={styles.phoneNumber}>+8 800 555 35 35</span>
            </div>
            
          </div>
        </div>
    </>
  )
}

export default Services