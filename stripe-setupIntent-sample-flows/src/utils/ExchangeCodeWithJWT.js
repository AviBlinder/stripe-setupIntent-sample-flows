// This is the second part of a HOSTED UI Authentication.
// shoud be used when response_type=code
import { ref } from 'vue';

export function getToken() {
  const login_code = route.query.code;
  console.log('login_code = ', login_code);

  const clientId = '37lj6lk2nm10dcka708himmpga';
  const clientSecret = '';
  const redirectURL = 'https://localhost:3005';

  const cognitoDomain =
    'https://stripe-setupintent-app.auth.eu-west-1.amazoncognito.com';

  const JWT = ref('')
  if (login_code) {
    const requestOptions = {
      method: 'POST',
  };
  try {
    fetch(
      `${cognitoDomain}/oauth2/token?grant_type=authorization_code&code=${login_code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectURL}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        JWT.value = data;
      });

      } catch (err) {
        console.log(" getToken error :", err)
      }
    }
}
