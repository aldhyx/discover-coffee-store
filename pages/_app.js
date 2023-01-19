import '../styles/global.scss';
import { IBM_Plex_Sans } from '@next/font/google';
import { StoreProvider } from '../stores/coffee-store';

const ibm = IBM_Plex_Sans({
    weight: ['400', '500', '600', '700'],
    style: ['italic', 'normal'],
    subsets: ['latin'],
});

function MyApp({ Component, pageProps }) {
    return (
        <StoreProvider>
            <div className={ibm.className}>
                <Component {...pageProps} />
            </div>
        </StoreProvider>
    );
}

export default MyApp;
