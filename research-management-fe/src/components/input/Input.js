import React from 'react';

const Input = ({
	label,
	name,
	value,
	type = 'text',
	onChange,
	placeHolder,
	className,
	isError = false,
	errorMessage = '',
	...props
}) => {
	return (
		<div className={`${className} my-2`}>
			<label htmlFor={label} className='form-label'>
				{label}
			</label>
			<input
				type={type}
				className={`form-control ${
					type === 'submit' ? 'btn btn-primary' : ''
				}`}
				onChange={onChange}
				value={value}
				name={name}
				placeholder={placeHolder}
				{...props}
			/>
			{isError && (
				<div className='alert alert-danger py-2 my-2'>
					{errorMessage}
				</div>
			)}
		</div>
	);
};

export default Input;
