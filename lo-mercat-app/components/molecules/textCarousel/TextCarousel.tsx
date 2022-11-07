import React, { useState, useEffect } from 'react';

import Styles from 'styles/components/carousel.module.scss';

const data = [
  "Fresh local products",
  "Boost your body!",
  "Get to know us in only 3 steps"
];

const TextCarousel = () =>{
  const [index, setIndex] = useState(0)

  const tick = () => {
    setIndex((index + 1) % data.length)
  }

  useEffect(() => {
    const timerID = setTimeout(() => tick(), 5000)
    return () => {
      clearTimeout(timerID)
    }
  }, [index])

  return <CarouselElement text={data[index]} />
}

const CarouselElement = (props : {text: string}) => {
  const text = props.text;
  return (
    <h2 className={Styles.text}>{text}</h2>
  )
}

export default TextCarousel;