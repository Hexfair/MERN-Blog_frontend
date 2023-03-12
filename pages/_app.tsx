import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '@/layout/Layout';
import { Roboto } from 'next/font/google';
import { wrapper } from '@/redux/store';
import { Provider } from 'react-redux';
//=========================================================================================================================
const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin', 'cyrillic'],
});
//=========================================================================================================================

const App = ({ Component, ...rest }: AppProps) => {
	const { store, props } = wrapper.useWrappedStore(rest);
	return (
		<Provider store={store}>
			<Layout className={roboto.className}>
				<Component {...props.pageProps} />
			</Layout>
		</Provider>
	);
};

export default App;