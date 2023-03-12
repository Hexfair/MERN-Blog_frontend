import React from 'react';
import { Sidebar } from '../components/Sidebar/Sidebar';
import styles from './Layout.module.scss';
import { Header } from '@/components/Header/Header';
import { LayoutProps } from './Layout.props';
import { useAppDispatch } from '@/redux/store';
import { fetchGetMe } from '@/redux/auth/auth.slice';
//=========================================================================================================================

export const Layout = ({ children }: LayoutProps): JSX.Element => {
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		window.localStorage.getItem('token') && dispatch(fetchGetMe());
	}, [dispatch]);

	return (
		<div className={styles.wrapper}>
			<Sidebar />
			<main className={styles.main}>
				<Header />
				{children}
			</main>
		</div>
	);
};