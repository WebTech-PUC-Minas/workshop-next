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
