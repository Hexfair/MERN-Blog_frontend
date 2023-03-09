import Image from 'next/image';
import styles from './Sidebar.module.scss';
import { SidebarProps } from './Sidebar.props';
import MainIcon from './MainIcon.svg';
import AddPostIcon from './AddPostIcon.svg';
import MyPostsIcon from './MyPostsIcon.svg';
import Exit from './Exit.svg';
import Link from 'next/link';
//=========================================================================================================================

const sidebarLinks = [
	{ id: 0, icon: <MainIcon />, description: 'Главная', route: '/' },
	{ id: 1, icon: <MyPostsIcon />, description: 'Мои посты', route: '/my-posts' },
	{ id: 2, icon: <AddPostIcon />, description: 'Добавить пост', route: '/add-post' },
];

//=========================================================================================================================

export const Sidebar = ({ ...props }: SidebarProps): JSX.Element => {
	return (
		<div className={styles.sidebar} {...props}>
			<div className={styles.image}>
				<Image
					src='/image/ellipse.jpg'
					width={50}
					height={50}
					alt='Avatar'
				/>
			</div>
			<ul className={styles.list}>
				{sidebarLinks.map((obj) =>
					<li key={obj.id} className={styles.link}>
						<Link href={obj.route}>
							{obj.icon}
							{obj.description}
						</Link>
					</li>
				)}
				<li className={styles.exit}>
					<Link href='/auth/login'>
						<Exit />
						Войти
					</Link>

				</li>
			</ul>
		</div>
	);
};