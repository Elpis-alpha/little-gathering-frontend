import Head from 'next/head'

const HeadTag = ({ title, description }) => {

  return (

    <Head>

      <meta charSet="UTF-8" />

      <meta name="author" content="Elpis" />

      <meta name='robots' content='index,follow' />

      <meta name="theme-color" content="#c2c2c2" />

      <meta name="keywords" content="forum,blog,gathering" />

      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta name="description" content={description ? description : "A simple gathering titled Little Gathering which users publish posts and comments and interact with each other"} />

      <title>Little Gathering {title && `| ${title}`}</title>

      <meta name="google-site-verification" content="pr129wxjduo5wNmDWxCBa7KshsApgXKh31G-hNbz-Eg" />

      <link rel="icon" href="/favicon.ico" />

      <link rel="apple-touch-icon" href="/logo192.png" />

      <link rel="manifest" href="/manifest.json" />

    </Head>

  )

}

export default HeadTag