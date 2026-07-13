# Marine v1.0 - Portal de Vigilancia y Control

Este proyecto es una plataforma web institucional para que los Cazarecompensas puedan tener acceso facil y detallado de todos los pedidos de captura que tiene la Marina. El sistema combina una estética militar y rústica (inspirada en la temática de One Piece) con estándares modernos de desarrollo web.
Se puede visualizar facilmente los objetivos, simular comprar carteles de los piratas buscados, reportar capturas, controlar los casos de exitos en capturas que tiene la Marina, como asi tambien aquellos que aun faltan por capturar. Este sistema tiene la misma validez que un documento oficial, asique cualquier dato incorrecto o malintencionado sera penado. 
Este sistema facilita y combina la modernizacion con el cumplimiento y agilidad en la captura de aquellos piratas que son buscados.

## Tecnologías Utilizadas

* **HTML5 Semántico**: Uso de etiquetas estructurales (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`) para mejorar la accesibilidad y el SEO.
* **CSS3**:
    * **Flexbox**: Implementado en el sistema de navegación, la cuadrícula de objetivos y el diseño del formulario.
    * **CSS Grid**: Utilizado en el "Muro de Honor" para una disposición de reseñas dinámica y equilibrada.
    * **Responsive Design**: Adaptación completa a dispositivos móviles mediante Media Queries.
    * **Pseudo-elementos y Animaciones**: Uso de `::before`, `::after` y `transitions` para efectos visuales (sellos de captura, elementos decorativos y efectos hover).
* **Google Fonts**: Integración de fuentes especializadas (`Rye`, `Special Elite`, `Oswald`, `Roboto`) para reforzar la identidad visual.
* **JavaScript**:
    * Asincronismo mediante `Fetch API` y Promesas.
    * Manipulación dinámica del DOM (`innerHTML`, selectores, eventos).
    * Persistencia local (`localStorage` y serialización de objetos JSON).
    * Métodos avanzados de orden superior para arrays (`filter`, `reduce`, `find`, `forEach`).
* **MockAPI**: Base de datos en la nube para simular un backend RESTful real.

* **Formspree**: Integración de servicio externo para el procesamiento de formularios de contacto sin necesidad de backend propio.

## Secciones del Proyecto

1.  **Inicio (Dashboard)**: Panel central con estadísticas globales y accesos rápidos para el usuario.
2.  **Objetivos Activos**: Galería de carteles de recompensa ("Wanted") con estilos personalizados que simulan papel antiguo, diferenciando aquellos que siguen siendo buscados y los que ya fueron capturados.
3.  **Expedientes Clasificados**: Detalle técnico de cada objetivo, incluyendo identificación fotográfica y tablas de datos de inteligencia con informacio reelevante para que la captura sea mas facil.
4.  **Muro de Honor**: Espacio de reseñas de colaboradores de elite, estilizado con marcas de agua y diseño de reporte oficial.
5.  **Informar Captura**: Formulario validado con búsqueda predictiva (datalist) y carga de archivos para el reporte de objetivos capturados.
6.  **Integración de API REST (MockAPI)** Los objetivos ya no son estaticos. Se consumen datos de los piratas de forma asincronica desde un servidor externo utilizando promesas ('fetch').
7.  **Carrito de Compras** :
      * Permite seleccionar cantidades personalizadas antes de añadir un cartel de buscado al carrito, para poder comprarle ejemplares al Cuartel General.
      * Persistencia de datos: Utiliza 'LocalStorage' para que el carrito no se pierda al navegar o recargar la pagina.
    **Control de Stock** 
      * La interfaz se bloquea automaticamente SIN Stock para aquellos piratas que ya fueron capturados.
      * El stock disponible se actualiza automaticamente dependiendo lo que el usuario ya tenga seleccionando en su carrito, controlando que no se supere el limite de stock disponible.
8.  **El campo de seleccion de objetivo en el formulario reportar.html se alimenta de la API 
  

## Instalación y Visualización

Para visualizar este proyecto de forma local:

1.  Clona el repositorio o descarga los archivos.
2.  Asegúrate de mantener la estructura de carpetas:
    * `/` (Raíz con archivos .html)
    * `/css` (Hoja de estilos styles.css)
    * `/img` (Recursos visuales y logos)
    * `/detalles` (Páginas de expedientes específicos)
    * `/js` (Consumo de API y logica del carrito)
3.  Abre el archivo `index.html` en cualquier navegador moderno o utiliza la extensión **Live Server** en VS Code.

Para visualizarlo en vivo
[Haz clic aquí para visitar el Bounty Hunter System](https://danielaarriazu.github.io/Bounty-Hunter-System/)

##  Autor

* **Daniela Arriazu** - *Desarrollo Frontend y Diseño de Interfaz*
* Estudiante del curso de frontend de TalentoTech.