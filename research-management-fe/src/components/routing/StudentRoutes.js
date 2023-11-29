import StudentGroup from '../../pages/student/StudentGroup';
import { Route } from 'react-router-dom';
import React from 'react';
import RequireAuth from './RequireAuth';
import AddToGroup from '../../pages/student/AddToGroup';
import ViewStudentGroups from '../../pages/shared/ViewStudentGroups';
import AddResearch from '../../pages/student/AddResearch';
import ManageResearch from '../../pages/student/ManageResearch';
import ViewSubmissionTypes from '../../pages/shared/ViewSubmissionTypes';
import ManageTemplates from '../../pages/admin/ManageTemplates';
import ViewSubmission from '../view-submission/ViewSubmission';
import EvaluatedSubmissions from '../../pages/staff/EvaluatedSubmissions';

export const STUDENT_ROUTES = [
	{
		path: '/student-group',
		element: <StudentGroup />
	},
	{
		path: '/add-students-to-group/:id/:name',
		element: <AddToGroup />
	},
	{
		path: '/view-student-groups',
		element: <ViewStudentGroups />
	},
	{
		path: '/add-research',
		element: <AddResearch />
	},
	{
		path: '/research-topic',
		element: <ManageResearch />
	},
	{
		path: '/submissions',
		element: <ViewSubmissionTypes />
	},
	{
		path: '/templates',
		element: <ManageTemplates />
	},
	{
		path: '/view-submission/:id',
		element: <ViewSubmission />
	},
	{
		path: '/evaluated',
		element: <EvaluatedSubmissions />
	}
];

export const getStudentRoutes = () => {
	return STUDENT_ROUTES.map((route, index) => {
		return (
			<Route
				key={index}
				exact
				path={route.path}
				element={
					<RequireAuth role='student'>{route.element}</RequireAuth>
				}
			/>
		);
	});
};
