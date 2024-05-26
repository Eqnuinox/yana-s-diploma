import { useSelector } from 'react-redux';
import { privateRouter } from './private';
import { publicRouter } from './public';
//
export const router = () => {
    const { isAuth } = useSelector((state) => state.authReducer);

    return isAuth ? privateRouter : publicRouter;
};
