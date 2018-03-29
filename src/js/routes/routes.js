import Register from '../components/register/Register';
import Login from '../components/login/Login';
import Start from '../components/main/start/Start';
import Explore from '../components/main/explore/Explore';
import User from '../components/main/user/User';
import UserImage from '../components/main/user/UserImage';

const routes = [
    {
        path: '/',
        component: Register
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/start',
        component: Start
    },
    {
        path: '/explore',
        component: Explore
    },
    {
        path: '/user',
        component: User
    },
    {
        path: '/userimage',
        component: UserImage
    }
];

export default routes;