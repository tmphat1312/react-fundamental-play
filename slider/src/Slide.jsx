function Slide({ index, image, name, title, quote, currentIndex }) {
  const style = {
    transform: `translateX(${100 * (index - currentIndex)}%)`,
    opacity: currentIndex == index ? 1 : 0,
    visibility: currentIndex == index ? 'visible' : 'hidden',
  }

  return (
    <article className='slide' style={style}>
      <img src={image} alt={name} className='slide-img' />
      <h3 className='slide-name'>{name}</h3>
      <p className='slide-title'>{title}</p>
      <q className='slide-quote'>{quote}</q>
    </article>
  )
}
export default Slide
