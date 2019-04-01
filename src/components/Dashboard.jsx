import React, {useReducer} from 'react';
import {Table} from "react-bootstrap";
import userActions from '../utilities/user/user-actions';

import '../assets/styles/dashboard.scss';

export const Dashboard = ({user}) => {

    const usersInit = userActions.returnAllUsersExceptLogged(user);

    const [users, dispatch] = useReducer((state, action) => {
        let newState = state.filter((_, index) => index !== action.index);
        userActions.saveUsers(newState);

        return newState;

    }, usersInit);

    return (
        <div className="col-12">
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th className='text-center'>#</th>
                    <th className='text-center'>Name</th>
                    <th className='text-center'>Username</th>
                    <th className='text-center'>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ?
                    users.map((user, index) => (
                            <tr key={index}>
                                <td className='text-center'>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                {/*<td className='text-center'>*/}
                                    {/*<FontAwesomeIcon icon="trash" onClick={() => dispatch({index})} className='cursor-pointer'/>*/}
                                {/*</td>*/}
                                <td className='text-center'>
                                    <span className="trash" onClick={() => dispatch({index})}>
    	                            <span></span>
    	                            <i></i>
                                    </span>
                                </td>
                            </tr>
                        ))
                    :<tr><h3 className='text-center'>No other users found!</h3></tr>}
                </tbody>
            </Table>
        </div>
    )
};