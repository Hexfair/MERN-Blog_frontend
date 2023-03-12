export const validationLogin = {
	email: { required: 'Введите email' },
	password: {
		required: 'Введите пароль',
		minLength: { value: 5, message: 'Пароль должен содержать минимум 5 символов' }
	}
};

export const validationRegister = {
	fullName: {
		required: 'Введите имя',
		minLength: { value: 3, message: 'Имя должно содержать минимум 3 символа' }
	},
	email: { required: 'Введите email' },
	password: {
		required: 'Введите пароль',
		minLength: { value: 5, message: 'Пароль должен содержать минимум 5 символов' }
	}
};