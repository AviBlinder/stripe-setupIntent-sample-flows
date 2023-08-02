// This is the second part of a HOSTED UI Authentication. 
// shoud be used when response_type=token
// For example:
// https://stripe-setupintent-app.auth.eu-west-1.amazoncognito.com/oauth2/authorize?client_id=37lj6lk2nm10dcka708himmpga&response_type=token&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3005%2F

import {ref} from 'vue'

export function getToken() {

  // Login verification
  const full_token = route.fullPath;
  // console.log('full_token =', full_token);
  const parsed_token = full_token.replace('/#id_token=', '');

  const token = parsed_token.split('&');

  const userData = ref({});

  console.log('id_token = ', token);

  const redirectURL = 'https://localhost:3005';

        if (token.length > 0) {
          //
          const clientId = '37lj6lk2nm10dcka708himmpga';
          const cognitoDomain =
            'https://stripe-setupintent-app.auth.eu-west-1.amazoncognito.com';

          const jwt = token[1].replace('access_token=', '');

          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
            // body: JSON.stringify({ /* Your request body here, if needed */ })
          };
          try {
            fetch(`${cognitoDomain}/oauth2/userInfo`, requestOptions)
              .then((response) => response.json())
              .then((data) => {
                userData.value = data
                console.log('data :', data);
              })
              
          } catch (err) {
            console.log('oauth2/userInfo error :', err);
          }
        } else {
          console.log('no code here');
        }    
}