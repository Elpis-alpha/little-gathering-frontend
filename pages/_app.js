import { createWrapper } from 'next-redux-wrapper'

import Authenticator from '../source/components/general/Authenticator';

import NextjsProgressbar from 'nextjs-progressbar';

import { Provider } from 'react-redux'

import GlobalStyles from '../source/beautify/GlobalStyles'

import NavBar from '../source/components/general/NavBar'

import store from '../source/store/store'


function MyApp({ Component, pageProps }) {

  return (

    <>

      <Provider store={store}>

        <GlobalStyles />

        <Authenticator />

        <NavBar />

        <NextjsProgressbar color='#4472c3' />

        <Component {...pageProps} />

      </Provider>

    </>

  )

}

const makeStore = () => store;

const wrapper = createWrapper(makeStore);


export default wrapper.withRedux(MyApp);
