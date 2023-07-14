/* eslint-disable */
import styled from 'styled-components'

function About() {
  return (
    <StyledAbout>
      <h2 className='title'>About us</h2>
      <p className='desc'>
        Introducing "MixMaster," the ultimate party sidekick app that fetches
        cocktails from the hilarious Cocktails DB API. With a flick of your
        finger, you'll unlock a treasure trove of enchanting drink recipes
        that'll make your taste buds dance and your friends jump with joy. Get
        ready to shake up your mixology game, one fantastical mocktail at a
        time, and let the laughter and giggles flow!
      </p>
    </StyledAbout>
  )
}

const StyledAbout = styled.section`
  .title {
    text-align: center;
    font-weight: 500;
    font-size: 4.2rem;
    margin-block-end: 1.2rem;
    color: var(--primary-500);
  }

  .desc {
    line-height: 2;
    color: var(--grey-500);
    max-inline-size: 70ch;
    margin-inline: auto;
  }

  @media screen and (width >= 48em) {
    .desc {
      font-size: 2rem;
    }
  }
`
export default About
