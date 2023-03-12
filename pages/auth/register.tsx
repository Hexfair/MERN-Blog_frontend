import React from 'react';
import styles from '@/styles/LoginPage.module.scss';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { Button } from '../../components/Button/Button';
import { fetchRegisterData } from '@/redux/auth/auth.slice';
import { useAppDispatch } from '@/redux/store';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { validationRegister } from '@/helpers/validationOptions';
import axios from 'axios';
import Image from 'next/image';
import { FormRegisterData } from '@/interfaces/register.interface';
import FileInput from '@/components/FileInput/FileInput';
//=========================================================================================================================

const RegisterPage: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const [fileValue, setFileValue] = React.useState<File>();
	const [fullNameValue, setFullNameValue] = React.useState('');
	const [emailValue, setEmailValue] = React.useState('');
	const [passwordValue, setPasswordValue] = React.useState('');

	const { register, handleSubmit, formState: { errors } } = useForm<FormRegisterData>({
		defaultValues: { fullName: '', email: '', password: '' },
		mode: "onBlur",
	});

	const onSubmit = async (values: FormRegisterData) => {
		try {
			const formData = new FormData();
			if (fileValue) {
				fileValue && formData.append('image', fileValue);
				const { data: avatarUrl } = await axios.post('http://localhost:4444/upload', formData);
				values.avatarUrl = avatarUrl.url;
			}
			const response = await dispatch(fetchRegisterData(values));

			if (response.meta.requestStatus === 'rejected') {
				alert('Произошла ошибка при регистрации');
			}

			if (response.meta.requestStatus === 'fulfilled' && response.payload) {
				alert('Вы успешно зарегистрировались');
				router.push('/');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.loginPage}>
			<div className={styles.formBox}>
				<h2 className={styles.title}>Регистрация аккаунта</h2>

				<FileInput
					setFileValue={(value) => setFileValue(value)} fileValue={fileValue} />

				<form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
					<div className={cn(styles.inputBox, { [styles.noEmpty]: fullNameValue.length !== 0 })}>
						<input
							{...register('fullName', validationRegister.fullName)}
							name='fullName'
							type='fullName'
							value={fullNameValue}
							onChange={(event) => setFullNameValue(event.target.value)}
						/>
						<span>Введите имя</span>
						<p className={styles.inputError}>{errors?.email && errors.email.message}</p>
					</div>
					<div className={cn(styles.inputBox, { [styles.noEmpty]: emailValue.length !== 0 })}>
						<input
							{...register('email', validationRegister.email)}
							name='email'
							type='email'
							value={emailValue}
							onChange={(event) => setEmailValue(event.target.value)}
						/>
						<span>Введите ваш email</span>
						<p className={styles.inputError}>{errors?.email && errors.email.message}</p>
					</div>
					<div className={cn(styles.inputBox, { [styles.noEmpty]: passwordValue.length !== 0 })}>
						<input
							{...register('password', validationRegister.password)}
							type='password'
							name='password'
							value={passwordValue}
							onChange={(event) => setPasswordValue(event.target.value)}
							autoComplete='new-password'

						/>
						<span>Введите пароль</span>
						<p className={styles.inputError}>{errors?.password && errors.password.message}</p>

					</div>
					<Button type='submit' color='aqua'>Зарегистрироваться</Button>
					<Link href='/auth/register'>
						<span className={styles.link}>Уже есть аккаунт?</span>
					</Link>
				</form>

			</div >
		</div >
	);
}

export default RegisterPage;
