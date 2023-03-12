import Image from 'next/image';
import React from 'react';
import { Button } from '../Button/Button';
import { FileInputProps } from './FileInput.props';
import styles from './FileInput.module.scss';
//=========================================================================================================================

const imageMimeType = /image\/(png|jpg|jpeg)/i;

//=========================================================================================================================
const FileInput = ({ setFileValue, fileValue, ...props }: FileInputProps) => {
	const [fileDataURL, setFileDataURL] = React.useState<string>();
	const inputFileRef = React.useRef<HTMLInputElement | null>(null);

	const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files ? event.target.files[0] : '';
		if (!file) {
			return;
		}

		if (!file.type.match(imageMimeType)) {
			alert('Картинка должна иметь формат jpg, jpeg или png!');
			return;
		}
		setFileValue(file);
	};

	const removeImage = () => {
		setFileDataURL('');
		setFileValue(undefined as unknown as File);
	};


	React.useEffect(() => {
		let fileReader: FileReader;
		let isCancel = false;

		if (fileValue) {
			fileReader = new FileReader();
			fileReader.onload = (e) => {
				if (!e.target) return;
				const { result } = e.target;
				if (result && !isCancel) {
					setFileDataURL(result as string);
				}
			};
			fileReader.readAsDataURL(fileValue);
		}
		return () => {
			isCancel = true;
			if (fileReader && fileReader.readyState === 1) {
				fileReader.abort();
			}
		};
	}, [fileValue]);

	return (
		<div className={styles.fileInput} {...props}>
			<input
				accept='image/*'
				hidden
				type='file'
				ref={inputFileRef}
				onChange={handleChangeFile}
			/>
			{<Image src={fileDataURL ? fileDataURL : '/image/noAvatar.svg'} alt="preview" width={80} height={80} />}
			<div className={styles.button}>
				<Button onClick={() => inputFileRef.current?.click()} color='grey'>Выбрать файл</Button>
				{fileValue && <button className={styles.removeImage} onClick={removeImage}>Удалить</button>}

			</div>
		</div >
	);
};

export default FileInput;