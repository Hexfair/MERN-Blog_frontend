import { UserItem } from "./user.interface";
//=========================================================================================================================

export interface PostItem {
	title: string;
	text: string;
	tags: string[];
	imageUrl: string;
	viewsCount: number;
	user: UserItem;
}