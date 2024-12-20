import { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Navbar />
            <Component {...pageProps} />
        </>
    );
}

export default appWithTranslation(MyApp);
