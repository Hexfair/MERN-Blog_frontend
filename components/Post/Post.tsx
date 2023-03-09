import Image from 'next/image';
import { Button } from '../Button/Button';
import styles from './Post.module.scss';
import { PostProps } from './Post.props';
//=========================================================================================================================

export const Post = ({ imageUrl = '', title, text, ...props }: PostProps): JSX.Element => {
	return (
		<div className={styles.article} {...props}>
			<div className={styles.image}>
				<Image
					src={imageUrl}
					priority={true}
					// src='/image/ellipse.jpg'
					fill
					sizes="(max-width: 768px) 500px, (max-width: 1200px) 600px"
					alt='Avatar'
				/>
			</div>
			<div className={styles.content}>
				<p className={styles.title}>{title}</p>
				<p className={styles.text}>{text}</p>
				<div className={styles.bottom}>
					<span className={styles.date}>25.09.2022</span>
					<span className={styles.tags}>HTML</span>
					<Button>Читать далее</Button>
				</div>
			</div>
		</div>
	);
};