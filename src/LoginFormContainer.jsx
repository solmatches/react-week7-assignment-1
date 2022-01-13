// 관심사: 리덕스 (상태변화 및 상태 불러오기)
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';

import { get } from './utils';

import {
  requestLogin,
  changeInputField,
} from './actions';

export default function LoginFormContainer() {
  const accessToken = useSelector(get('accessToken'));

  const { email, password } = useSelector(get('inputField'));

  const dispatch = useDispatch();

  function handleChangeField({ name, value }) {
    dispatch(changeInputField({ name, value }));
  }

  function handleClick() {
    dispatch(requestLogin());
  }

  return (
    <div>
      <LoginForm
        field={{ email, password }}
        onClick={handleClick}
        onChangeField={handleChangeField}
      />
      <p>{accessToken}</p>
    </div>
  );
}
