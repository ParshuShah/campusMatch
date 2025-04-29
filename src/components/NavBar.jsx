import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';



const NavBar = () => {

    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async() => {
        try{
            await axios.post(
                BASE_URL + "/logout",
                {},
                {withCredentials : true}
            );
            dispatch(removeUser());
            navigate("/login");
            
        }catch(err){
            //Error logic maybe redirect to error page
        }
    }

    return (
        <div className="navbar bg-base-300 shadow-sm px-3">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl "><img 
                src = "https://www.svgrepo.com/show/299469/tinder.svg"
                width={50}
                /></Link>
            </div>
            <div className="flex gap-2">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                {user && ( <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user.photoURL} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/connections">Connections</Link>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>)}
            </div>
        </div>
    )
}

export default NavBar;