import Home from './views/Home';
import RoomsPage from './views/RoomsPage';
import RoomPage from './views/RoomPage';

const routes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/rooms',
        element: <RoomsPage />,
    },
    {
        path: '/room/:uuid',
        element: <RoomPage />,
    },
];

export default routes;
