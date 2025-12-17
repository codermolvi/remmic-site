import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

// Import warning suppression
if (typeof window !== 'undefined') {
  require('../utils/suppressWarnings.js')
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>REMMIC - Premium Real Estate Investment Platform</title>
        <meta name="description" content="Experience the future of premium real estate investment. Revolutionary blockchain platform combining elite properties with cutting-edge technology." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#C9A74D" />
        
        <meta property="og:title" content="REMMIC - Premium Real Estate Investment Platform" />
        <meta property="og:description" content="Experience the future of premium real estate investment. Revolutionary blockchain platform combining elite properties with cutting-edge technology." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/REMMIC ONLY LOGO.svg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="REMMIC - Premium Real Estate Investment Platform" />
        <meta name="twitter:description" content="Experience the future of premium real estate investment. Revolutionary blockchain platform combining elite properties with cutting-edge technology." />
        
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}