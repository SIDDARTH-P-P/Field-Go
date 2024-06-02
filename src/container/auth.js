import { put } from 'redux-saga/effects';

import { Base64 } from 'js-base64';


function* basicApi(value) {
  console.log('++', value);
  const token = yield localStorage.getItem(process.env.REACT_APP_TOKEN);
  let authorization = value.authourization
    ? value.authourization === 'Basic'
      ? 'Basic ' + Base64.btoa(value.body.mobileNo + ':' + value.body.password)
      : `Bearer ${token}`
    : `Bearer ${token}`;

  const authHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: authorization
  };
  const noauthHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  try {
    console.log('======authHeader======', value);
    const responseCrud = yield fetch(`${value.api}`, {
      method: `${value.method}`,
      headers: value.authourization !== null ? authHeader : noauthHeader,
      body: value.body ? value.body : null
    });

    console.log("===============responseCrud==============",responseCrud);

    if (!responseCrud.ok) {
      throw responseCrud;
    } else {
      if (responseCrud.status === 204) {
        yield put({
          type: `${value.successAction.type}`,
          payload: value.payload
        });
        console.log("payload=====", payload);
        return { status: 204, msg: 'Updated Successfully' };
      } else {
        const responseData = yield responseCrud.json();
        console.log("==========responseData=========",responseData);
        yield put({
          type: `${value.successAction.type}`,
          payload: responseData
        });
        return responseData;
      }


    }
  } catch (error) {
    console.error('error', error);
    yield put({
      type: `${value.failAction.type}`,
      payload: error
    });
  }
  
}


export default { basicApi };
