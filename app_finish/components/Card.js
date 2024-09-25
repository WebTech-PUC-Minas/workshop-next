"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import style from "./Card.module.css";
import Image from 'next/image';
import heartSolid from '../../public/icons/heart-solid.svg';
import heartRegular from '../../public/icons/heart-regular.svg';

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
            <Image className={style.icon} src={heartSolid} alt="favorited" onClick={handleClick} />
          ) : (
            <Image className={style.icon} src={heartRegular} alt="not favorited" onClick={handleClick} />
          )}
        </div>
      </article>
    </div>
  );
}

export default Card;
