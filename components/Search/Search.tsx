import React from "react";
import styles from './Search.module.scss';
import { SearchProps } from "./Search.props";
//=========================================================================================================================

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
	return (
		<input disabled className={styles.input} placeholder='Поиск по блогу' {...props} />
	);
};