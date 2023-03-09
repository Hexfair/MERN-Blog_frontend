import { HeaderProps } from './Header.props';
import styles from './Header.module.scss';
import { Search } from '../Search/Search';
//=========================================================================================================================

export const Header = ({ ...props }: HeaderProps): JSX.Element => {
	return (
		<header className={styles.header} {...props}>
			<div className={styles.logo}>HEXFAIR Blog</div>
			<div className={styles.search}><Search /></div>
		</header>
	);
};