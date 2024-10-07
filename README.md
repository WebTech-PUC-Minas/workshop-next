# Do Zero ao Deploy com React.js e Next.js

## Introdução

Bem-vindos ao workshop de Next! Este repositório serve como apoio para acompanhar o conteúdo e realizar as práticas ao longo do curso. Qualquer dúvida, não hesite em recorrer aos instrutores que estarão disponíveis para ajudar.

## Setup

Para começar, siga os passos abaixo para configurar o ambiente do projeto:

```bash
git clone https://github.com/WebTech-PUC-Minas/workshop-next.git
cd workshop-next
npm install
npm run dev
```
Agora você está pronto para começar a explorar Next!

## Otimização

O Next.js oferece diversas ferramentas integradas para otimizar o desempenho da aplicação, como o componente Link para navegação, o componente Image para manipulação de imagens, e o carregamento otimizado de fontes.

### Imagem

O componente `next/image` otimiza o carregamento de imagens no Next.js. Ele oferece funcionalidades como carregamento sob demanda, suporte a diferentes formatos (como WebP) e redimensionamento automático de imagens para diferentes tamanhos de tela, garantindo uma melhor performance.

```jsx
// components/Card.js
import {AiOutlineHeart } from "react-icons/ai";
import style from "./Card.module.css";
import Image from "next/image";

function Card({ banner, title, date }) {
  return (
    <div className={style.card}>
      <figure>
        <Image
          src={banner}
          alt={title}
          width={640}
          height={360}
          layout="responsive"
        />
      </figure>
      <article>
        <h1>{title}</h1>
        <div>
          <time>{date}</time>
          <AiOutlineHeart className={style.icon} />
        </div>
      </article>
    </div>
  );
}
export default Card;
```

### Link

O componente `next/link` do Next.js é utilizado para navegação entre páginas, oferecendo otimizações automáticas como pré-carregamento de rotas quando o link entra em foco. Isso melhora a experiência do usuário e o desempenho da aplicação.

```jsx
import style from './Navbar.module.css';
import Link from 'next/link';

function Navbar() {
  return (
    <header className={style.navbar}>
      <h1><Link href="/">WebTech PUC Minas</Link></h1>
      <nav>
        <ul>
          <li>
            <Link href="/">React.js</Link>
          </li>
          <li>
            <Link href="/pages/next">Next.js</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
```

### Fonte

O Next.js permite o carregamento otimizado de fontes utilizando o componente `next/font` do Next.js. Isso reduz o tempo de carregamento e garante uma experiência visual mais fluida.

```jsx
import "./globals.css";
import Navbar from "./components/Navbar";
import { Roboto, Poppins } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap', 
});

const poppins = Poppins({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Navbar className={poppins.className} />
        {children}
      </body>
    </html>
  );
}
```

## Rotas em Next

O Next.js utiliza um sistema de roteamento baseado na estrutura de pastas e arquivos. Cada pasta dentro da pasta `pages\` se torna uma rota automaticamente.

1. Crie uma pasta chamada `next` dentro da pasta `pages\`;
2. mova o arquivo `Next.js` e o renomeie para `page.js`;
3. Altere o link na Navbar para utilizar o `next/link`.

```jsx
import style from './Navbar.module.css';
import Link from 'next/link';

function Navbar() {
  return (
    <header className={style.navbar}>
      <h1><Link href="/">WebTech PUC Minas</Link></h1>
      <nav>
        <ul>
          <li>
            <Link href="/">React.js</Link>
          </li>
          <li>
            <Link href="/pages/next">Next.js</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
```

### Criando as rotas aninhadas dinâmicas

Para criar rotas aninhadas dinâmicas, você pode usar colchetes `[slug]` para definir uma rota.

1. dentro da pasta `pages/next/` crie uma subpasta chamada `[slug]`;
2. dentro da pasta `[slug]` crie um arquivo chamado page.js;
3. adicione o conteúdo da página.
```jsx
export default function MovieDetailsPage({params}) {
    return (
      <div className="next_page">
        <h1>
          Bem vindo ao <span>WebTech</span>
        </h1>
        <p>Essa é a página {params.slug}</p>
      </div>
    );
}
```
4. teste a rota com o link: https://pages/next/123 

## O que é Client Side Rendering (CSR) e Server Side Rendering (SSR)

### CSR

CSR é uma técnica onde o conteúdo da página é gerado no navegador do cliente, utilizando JavaScript. O servidor entrega um HTML básico e um pacote de JavaScript que constrói a interface e busca dados dinamicamente. Isso proporciona uma experiência interativa, mas pode resultar em tempos de carregamento iniciais mais longos e impactar negativamente o SEO, pois o conteúdo só está disponível após a execução do JavaScript.

1. Crie um arquivo chamado `.env.local` e insira:
```.env
NEXT_PUBLIC_TMDB_API_KEY = ""
```
2. Entre as àspas coloque a sua chave da [API](https://www.themoviedb.org/settings/api)
3. Em pages/next/page.js insira:
```jsx
//pages/next/page.js
"use client";

import { useEffect, useState } from "react";
import Card from "../../components/Card";

export default function NextPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=pt-BR&page=1`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Erro ao buscar os filmes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [apiKey]);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            banner={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
            date={formatDate(movie.release_date)}
          />
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}
```
```jsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import style from "./Card.module.css";
import Image from 'next/image';

function Card({ banner, title, date, id }) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setShow(!show);
  };

  const handleCardClick = () => {
    if (id) {
      router.push(`./next/${id}`);
    }
  };

  return (
    <div className={style.card} onClick={handleCardClick}>
      <figure>
        <Image src={banner} alt={title} width={640} height={360} layout="responsive" />
      </figure>
      <article>
        <h1>{title}</h1>
        <div>
          <time>{date}</time>
          {show ? (
            <AiFillHeart className={style.icon} onClick={handleClick} />
          ) : (
            <AiOutlineHeart className={style.icon} onClick={handleClick} />
          )}
        </div>
      </article>
    </div>
  );
}

export default Card;
```

> Importante: Ao utilizar imagens de fontes externas, é necessário configurar o next.config.mjs. Abaixo, você deve preencher com a configuração necessária:

```next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        "image.tmdb.org",
      ],
    },
  };
  
  export default nextConfig;
```

### SSR

Server Side Rendering (SSR) é a técnica em que o conteúdo da página é gerado no servidor. O servidor processa a solicitação, busca dados e entrega um HTML completo ao navegador. Isso resulta em tempos de carregamento iniciais mais rápidos e melhora a indexação nos mecanismos de busca, uma vez que o conteúdo está disponível no HTML. No entanto, a navegação pode ser menos fluida, pois cada nova interação pode exigir um recarregamento da página.

1. No arquivo `.env.local` e insira:
```.env
TMDB_API_KEY = ""
```
2. Entre as àspas coloque a sua chave da [API](https://www.themoviedb.org/settings/api)
3. Em pages/next/page.js insira:

```jsx
//pages/next/[slug]/page.js
import Image from 'next/image';
import styles from './page.module.css';

export default async function MovieDetailsPage({ params }) {
  const movieId = params.slug;
  const apiKey = process.env.TMDB_API_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`
  );

  if (!res.ok) {
    throw new Error('Falha ao buscar os filmes');
  }

  const data = await res.json();
  const movieDetails = data;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container">
      {movieDetails.poster_path || movieDetails.title || movieDetails.date || movieDetails.overview || movieDetails.vote_average ? (
        <div className={styles.wrapper}>
          {movieDetails.poster_path && (
            <Image className={styles.image}
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
              width={200}
              height={300}
            />
          )}

          <div className={styles.details}>
            <h1 className={styles.title}>{movieDetails.title}</h1>
            <div>
              <div className={styles.releaseDate}>
                Data de Lançamento: {formatDate(movieDetails.date)}
              </div>
              <div className={styles.voteAverage}>
                Avaliação: {movieDetails.vote_average}
              </div>
              <p className={styles.overview}>Descrição: <br /> {movieDetails.overview}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Detalhes do filme não encontrados.</p>
      )}
    </div>
  );
}
```

Esperamos que este workshop tenha te ajudado a entender melhor o Next. Não se esqueça de praticar e, caso precise, pergunte aos instrutores para esclarecer suas dúvidas.
