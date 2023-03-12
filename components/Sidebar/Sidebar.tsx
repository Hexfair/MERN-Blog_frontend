import Image from 'next/image';
import styles from './Sidebar.module.scss';
import { SidebarProps } from './Sidebar.props';
import MainIcon from './MainIcon.svg';
import AddPostIcon from './AddPostIcon.svg';
import MyPostsIcon from './MyPostsIcon.svg';
import Exit from './Exit.svg';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, useAppDispatch } from '@/redux/store';
import { logout } from '@/redux/auth/auth.slice';
//=========================================================================================================================

export const Sidebar = ({ ...props }: SidebarProps): JSX.Element => {
	const dispatch = useDispatch();

	const dataUser = useSelector((state: AppState) => state.auth.dataUser);

	const onClickLogout = () => {
		if (window.confirm('Вы действительно хотите выйти?')) {
			dispatch(logout());
			window.localStorage.removeItem('token');
		}
	};

	return (
		<div className={styles.sidebar} {...props}>
			<div className={styles.image}>
				{/* <Image
					src={dataUser && dataUser.avatarUrl ? `http://localhost:4444${dataUser.avatarUrl}` : '/image/ellipse.jpg'}
					width={50}
					height={50}
					alt='Avatar'
				/> */}
				<img src={dataUser && dataUser.avatarUrl ? `http://localhost:4444${dataUser.avatarUrl}` : '/image/noAvatar.svg'} alt='Avatar' />
			</div>
			<ul className={styles.list}>
				<li className={styles.link}>
					<Link href='/'>
						<MainIcon /> Главная
					</Link>
				</li>
				<li className={styles.link}>
					<Link href={dataUser ? '/posts/user-posts' : '/auth/login'}>
						<MyPostsIcon /> Мои посты
					</Link>
				</li>
				<li className={styles.link}>
					<Link href={dataUser ? '/posts/add-post' : '/auth/login'}>
						<AddPostIcon /> Добавить пост
					</Link>
				</li>
				{dataUser
					? <li className={styles.exit}>
						<a onClick={onClickLogout}><Exit /> Выйти</a>
					</li>
					: <li className={styles.enter}>
						<Link href='/auth/login'>
							<Exit /> Войти
						</Link>
					</li>
				}
			</ul>
		</div>
	);
};