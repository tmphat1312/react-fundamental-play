import hero from './assets/hero.svg'

function Hero() {
  return (
    <section className='hero'>
      <div className='text-container'>
        <h1 className='title'>Contentful CMS</h1>
        <p className='desc'>
          Pour-over vexillologist sriracha, kitsch letterpress health goth four
          loko organic poutine disrupt tonx offal. Selfies slow-carb pok pok
          bitters iceland vaporware readymade fanny pack cloud bread waistcoat
          tbh twee skateboard. Hell of sustainable pitchfork lyft, fam
          cold-pressed paleo polaroid artisan leggings semiotics letterpress.
        </p>
      </div>
      <figure className='img-container'>
        <img src={hero} alt='A woman with a browser' className='img' />
      </figure>
    </section>
  )
}
export default Hero
