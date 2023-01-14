import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { changeLanguage } from '../i18'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  if (router.locale) {
    changeLanguage(router.locale)
  }
  return <Component {...pageProps} />
}
