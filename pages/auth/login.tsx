import React from 'react';
import styles from '@/styles/LoginPage.module.scss';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { Button } from '../../components/Button/Button';
import { fetchLoginData } from '@/redux/auth/auth.slice';
import { useAppDispatch } from '@/redux/store';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { validationLogin } from '@/helpers/validationOptions';
import { FormLoginData } from '@/interfaces/login.interface';
//=========================================================================================================================

const LoginPage: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const [emailValue, setEmailValue] = React.useState('');
	const [passwordValue, setPasswordValue] = React.useState('');

	const { register, handleSubmit, formState: { errors } } = useForm<FormLoginData>({
		defaultValues: { email: '', password: '' },
		mode: "onBlur",
	});

	const onSubmit = async (values: FormLoginData) => {
		try {
			const response = await dispatch(fetchLoginData(values));
			if (response.meta.requestStatus === 'rejected') {
				alert('Не верно указаны логин или пароль');
			}

			if (response.meta.requestStatus === 'fulfilled' && response.payload) {
				router.push('/');
			}
		} catch (error) {
			console.log(error);
		}

	};

	return (
		<div className={styles.loginPage}>
			<div className={styles.formBox}>
				<h2 className={styles.title}>Вход в аккаунт</h2>

				<form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
					<div className={cn(styles.inputBox, { [styles.noEmpty]: emailValue.length !== 0 })}>
						<input
							{...register('email', validationLogin.email)}
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
							{...register('password', validationLogin.password)}
							type='password'
							name='password'
							value={passwordValue}
							onChange={(event) => setPasswordValue(event.target.value)}
							autoComplete='new-password'

						/>
						<span>Введите пароль</span>
						<p className={styles.inputError}>{errors?.password && errors.password.message}</p>

					</div>
					<Button type='submit'>Войти</Button>
					<Link href='/auth/register'>
						<span className={styles.link}>Нет аккаунта?</span>
					</Link>
				</form>

			</div >
		</div >
	);
}

export default LoginPage;
