import '../styles/global.scss';
import { IBM_Plex_Sans } from '@next/font/google';

const ibm = IBM_Plex_Sans({
    weight: ['400', '500', '600', '700'],
    style: ['italic', 'normal'],
    subsets: ['latin'],
});

function MyApp({ Component, pageProps }) {
    return (
        <div className={ibm.className}>
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
