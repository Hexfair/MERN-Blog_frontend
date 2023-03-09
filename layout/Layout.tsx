import { Sidebar } from '../components/Sidebar/Sidebar';
import styles from './Layout.module.scss';
import { Header } from '@/components/Header/Header';
import { LayoutProps } from './Layout.props';
//=========================================================================================================================

export const Layout = ({ children }: LayoutProps): JSX.Element => {
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