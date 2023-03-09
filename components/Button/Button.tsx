import React from "react";
import { ButtonProps } from "./Button.props";
import styles from './Button.module.scss';
//=========================================================================================================================

export const Button = ({ children, className, ...props }: ButtonProps): JSX.Element => {
	return (
		<button className={styles.button} {...props}>{children}</button>
	);
};