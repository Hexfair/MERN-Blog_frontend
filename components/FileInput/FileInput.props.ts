import { DetailedHTMLProps, HTMLAttributes } from "react";
//=========================================================================================================================

export interface FileInputProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	setFileValue: (value: File) => void;
	fileValue: File | undefined;
}
