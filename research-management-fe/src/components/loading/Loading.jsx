import React from 'react';
import './Loading.styles.css';

const Loading = () => {
	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				zIndex: '100000',
				background: '#06000052',
				position: 'fixed',
				top: '0',
				left: '0'
			}}
			className={'d-flex justify-content-center align-items-center'}>
			<div className='lds-ring'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export const Spinner = () => {
	return (
		<div className='d-flex justify-content-center'>
			<div className='spinner-border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</div>
		</div>
	);
};

export default Loading;
