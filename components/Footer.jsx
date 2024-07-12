import React from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <div>
            <h4>Navega</h4>
            <ul>
              <li><a href="#">Acerca de Nosotros</a></li>
              <li><a href="/oportunidades">Oportunidades y Prácticas</a></li>
              <li><a href="#">Proyectos Colaborativos</a></li>
              <li><a href="#">Muro de Eventos</a></li>
              <li><a href="#">Mentoría</a></li>
            </ul>
            </div>
            <div>
            <h4>Navega</h4>
            <ul>
              <li><a href="#">Feedback Profesional</a></li>
              <li><a href="#">Mi Comunidad</a></li>
            </ul>
          </div>
          <div>
            <h4>Recursos</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Eventos Destacados</a></li>
              <li><a href="#">Top 10 Growing Up</a></li>
              <li><a href="#">Fotos y Videos</a></li>
              <li><a href="#">F.A.Q.</a></li>
            </ul>
          </div>
            <div className="socialMedia">
                <h4>Nuestras Redes</h4>
                {/* Iconos de redes sociales */}
                <a href="https://www.tiktok.com/@growing_up_plus?_t=8nj0ZSGs0xh&_r=1" target="_blank">Tiktok</a>
                <p> </p>
                <a href="https://x.com/Growing_up_plus?t=BHYvnAb_UksV_S9ihL3CBQ&s=09" target="_blank">Twitter</a>
                <p> </p>
                <a href="https://www.instagram.com/growing_up_plus?igsh=MWpnYnd2aHA2cjIwaw==" target="_blank">Instagram</a>
            </div>
            <p><strong>Powered by:</strong> Growing Up © {currentYear}</p>
        </footer>
    );
}
