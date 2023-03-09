import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '@/layout/Layout';
import { Roboto } from 'next/font/google';
//=========================================================================================================================

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin', 'cyrillic'],
});
//=========================================================================================================================

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Layout className={roboto.className}>
			<Component {...pageProps} />
		</Layout>
	)
}
