import { getAuthors } from '../../services';
import { setAuthors } from '../slices/authorsSlice';
import { AppDispatch } from '../index';


export const createAuthorThunk = () => {};

export const getAuthorsThunk = () => {
  return async (dispatch: AppDispatch) => {
    const { result } = await getAuthors();
    dispatch(setAuthors(result));
  };
};