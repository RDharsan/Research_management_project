import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, details, cta, link, ...props }) => {
	return (
		<div className='card bg-dark text-light'>
			<div className='card-body'>
				<h5 className='card-title'>{title}</h5>
				<p className='card-text'>{details}</p>
				<div className='card-text'>{props.children}</div>
				{cta && (
					<Link to={link}>
						<button className='btn btn-primary'>{cta}</button>
					</Link>
				)}
			</div>
		</div>
	);
};

export default Card;
