import React, { useContext } from 'react';
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import { AuthContext } from '../../store/auth';
import { evaluateSubmission } from '../../utli/submission.utli';
import Input from '../input/Input';

const SubmittedSubmissionItem = ({ submission, onEvaluate }) => {
	const { getRole } = useContext(AuthContext);
	const role = getRole();
	const [state, setState] = React.useState({
		marks: null,
		comment: ''
	});
	const [loading, setLoading] = React.useState(false);
	const [errors, setErrors] = React.useState({
		marks: '',
		comment: ''
	});

	const validate = () => {
		let isValid = true;
		if (!state.marks) {
			setErrors({ ...errors, marks: 'Marks is required' });
			isValid = false;
		} else if (state.comment === '') {
			setErrors({ ...errors, comment: 'Comment is required' });
			isValid = false;
		}
		return isValid;
	};
	const onChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
		setErrors({ ...errors, [e.target.name]: '' });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (validate()) {
			const response = await evaluateSubmission(submission._id, state);
			if (response.status) {
				toast.success('Submission evaluated successfully');
				setState({
					marks: null,
					comment: ''
				});
				onEvaluate(response.submission);
			} else {
				toast.error('Error evaluating submission');
			}
		}
		setLoading(false);
	};
	return (
		<div className='row m-2 p-2  bg-dark text-light rounded'>
			<div className='col-md-12'>
				<div className='row'>
					<div className='col-md-4'>
						<span className='badge bg-secondary'>
							Student Group :{submission.studentGroup.name}
						</span>
					</div>
					<div className='col-md-4'>
						<span className='badge bg-secondary'>
							Submission :{submission.submissionType.name}
						</span>
					</div>
					<div className='col-md-4 text-end'>
						<span className='badge bg-secondary'>
							Submitted date:{' '}
							<Moment format='YYYY:MM:DD '>
								{submission.date}
							</Moment>
						</span>
					</div>
				</div>
				<hr />
				<div className='row mt-2'>
					<div className='col-md-8 text-wrap'>
						<h5> Submission type description </h5>
						<p className='text-break'>
							{submission.submissionType.description}
						</p>
					</div>
					<div className='col-md-4 text-end'>
						<a
							href={submission.submissionType.markingScheme}
							target='_blank'
							className='btn border border-primary text-light'>
							Download Marking Scheme
						</a>
					</div>
				</div>
				<hr />
				<div className='row mb-2'>
					<div className='col-md-7'>
						<h5>submitted file</h5>
					</div>
					<div className='col-md-5 text-end'>
						<a
							href={submission.files[0]}
							target='_blank'
							className='btn btn-success text-light'>
							Download Submitted file
						</a>
					</div>
				</div>
			</div>

			<hr />
			{submission.isEvaluated ? (
				<div className='row mb-2'>
					<div className='col-md-12'>
						<h4>Evaluation</h4>
						<h5>Marks : {submission.marks}</h5>
						<h5>Comment : {submission.comment}</h5>
					</div>
				</div>
			) : role === 'staff' ? (
				<div className='row'>
					<div className='col-md-12'>
						<h5>Evaluate</h5>
						<form className='row' onSubmit={onSubmit}>
							<Input
								label={'Marks'}
								className={'col-md-3'}
								type='number'
								name='marks'
								placeholder='80'
								isError={!!errors.marks}
								errorMessage={errors.marks}
								min='0'
								max='100'
								value={state.marks}
								onChange={onChange}
							/>
							<Input
								label={'Comment'}
								className={'col-md-7'}
								type='text'
								name='comment'
								isError={!!errors.comment}
								errorMessage={errors.comment}
								placeholder='Add your comment here'
								value={state.comment}
								onChange={onChange}
							/>
							<Input
								type='submit'
								className={'col-md-2'}
								label=' '
								value={loading ? 'Loading...' : 'Evaluate'}
							/>
						</form>
					</div>
				</div>
			) : (
				<div className='row'>
					<div className='col-md-12'>
						<h5>Not Evaluated Yet</h5>
					</div>
				</div>
			)}
			<hr />
		</div>
	);
};

export default SubmittedSubmissionItem;
