import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Hoş Geldiniz!</h1>
        <p>
          Zeka Oyunları ile eğlenceli ve öğretici bir yolculuğa çıkın. Hafızanızı güçlendirin, 
          problem çözme becerilerinizi geliştirin ve daha fazlasını keşfedin!
        </p>
      </header>
      <section className="home-features">
        <div className="feature">
          <h2>Hafıza Geliştirme</h2>
          <p>Hafıza oyunları ile beyninizi çalıştırın ve öğrenme hızınızı artırın.</p>
        </div>
        <div className="feature">
          <h2>Yaratıcılık</h2>
          <p>Kelime bulmaca gibi oyunlarla yaratıcılığınızı artırın.</p>
        </div>
        <div className="feature">
          <h2>Eğlenceli Zeka Testleri</h2>
          <p>Farklı seviyelerdeki oyunlarla kendinizi test edin.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
