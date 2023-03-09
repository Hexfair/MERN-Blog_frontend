import { DetailedHTMLProps, HTMLAttributes } from "react";
//=========================================================================================================================

export interface PostProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	imageUrl?: string;
	title: string;
	text: string;
	date?: string;
	tags?: string[];
}
