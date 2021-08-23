import { ChalllengesProvider } from '../contexts/ChallengesContexts';

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

return (
  <ChalllengesProvider>
        <Component {...pageProps} />
  </ChalllengesProvider>
  )
}

export default MyApp;
