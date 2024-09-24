import Card from "./components/Card.js";

export default function Home() {
  return (
    <div className="container">
      <Card banner="/images/movie_01.jpeg" title="Eduardo e Mônica" date="06/01/2022"/>
      <Card banner="/images/movie_02.jpg" title="Guardiões da Galáxia Vol 3" date="04/05/2023"/>
      <Card banner="/images/movie_03.jpeg" title="DeadPool e Wolwerine" date="24/07/2024"/>
      <Card banner="/images/movie_04.jpg" title="Oppenhimer" date="20/07/2023"/>
      <Card banner="/images/movie_05.jpg" title="Joker" date="03/10/2019"/>
      <Card banner="/images/movie_06.jpg" title="Boarderlands: O Destino do Universo Está em Jogo" date="08/08/2024"/>
      <Card banner="/images/movie_07.jpeg" title="Elementos" date="22/06/2023"/>
      <Card banner="/images/movie_08.jpeg" title="Wish: O Poder dos Desejos" date="04/01/2024"/>
    </div>
  );
}

