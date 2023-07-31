import {ref } from 'vue';

const disableButton = ref(true)

export default function SubmitButtonState(user, error) {
  const isSignupButtonDisabled =  () => {
    let disabled = true;
    for (let prop in user) {
      if ( error[prop] === undefined || error[prop] !== '') {
        disabled = true;
        disableButton.value = true
        break;
      }
      disabled = false;
      disableButton.value = false
    }
    return disabled;
  };
  return { isSignupButtonDisabled, disableButton };
}