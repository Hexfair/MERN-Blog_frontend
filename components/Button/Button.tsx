import React from "react";
import { ButtonProps } from "./Button.props";
import styles from './Button.module.scss';
import cn from 'classnames';
//=========================================================================================================================

export const Button = ({ children, color = 'aqua', className, ...props }: ButtonProps): JSX.Element => {
	return (
		<button className={cn(styles.button, {
			[styles.aqua]: color === 'aqua',
			[styles.grey]: color === 'grey',
		})} {...props}>{children}</button>
	);
};