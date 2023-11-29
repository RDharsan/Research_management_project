import React from 'react';
import { Link } from 'react-router-dom';

const Table = ({
	headers,
	data,
	keys,
	onDelete,
	updateLink,
	id,
	extraBtn = false,
	onExtraButtonClick,
	extraBtnTitle,
	extraComponent
}) => {
	return (
		<>
			<table className='table'>
				<thead>
					<tr>
						<th scope='col'>#</th>
						{headers.map((header, index) => {
							return (
								<th key={index} scope='col'>
									{header}
								</th>
							);
						})}
						{onDelete && <th scope='col'>Delete</th>}
						{updateLink && <th scope='col'>Update</th>}
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => {
						return (
							<tr key={index}>
								<th scope='row'>{index + 1}</th>
								{keys.map((key, index) => {
									return (
										<td
											key={index}
											className='text-wrap text-truncate text-break'>
											{row[key]}
										</td>
									);
								})}

								{extraBtn && (
									<td scope='col'>
										<button
											className='btn btn-primary'
											onClick={() => {
												onExtraButtonClick(row['_id']);
											}}>
											{extraBtnTitle}
										</button>
									</td>
								)}

								{extraComponent && (
									<td scope='col'>
										{extraComponent(row['_id'])}
									</td>
								)}
								{onDelete && (
									<td scope='col'>
										<button
											className='btn btn-danger'
											onClick={() => {
												window.confirm(
													'Are you sure you need to delete this?'
												) && onDelete(row['_id']);
											}}>
											Delete
										</button>
									</td>
								)}
								{updateLink && (
									<td scope='col'>
										<Link
											className='btn btn-primary'
											to={`${updateLink}/${row[id]}`}>
											Update
										</Link>
									</td>
								)}
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default Table;
