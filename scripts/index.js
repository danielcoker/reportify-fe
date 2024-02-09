const BASE_URL = 'https://reportify-b3xwl.ondigitalocean.app/api/v1';
const HEADERS = { 'Content-Type': 'application/json' };

let coords = {};

const getLocationSuccessCallback = (position) => {
  coords['longitude'] = position.coords.longitude;
  coords['latitude'] = position.coords.latitude;
};

const getLocationErrorCallback = (error) => {
  console.log("Could not fetch user's location");
};

window.addEventListener('load', () => {
  navigator.geolocation.getCurrentPosition(
    getLocationSuccessCallback,
    getLocationErrorCallback
  );
});

const submitReport = (event) => {
  event.preventDefault();

  const reportForm = document.getElementById('report-form');
  const name = document.getElementById('name-input').value;
  const phone = document.getElementById('phone-input').value;
  const description = document.getElementById('description-input').value;
  const submitReportBtn = document.getElementById('submit-report-button');
  const spinner = document.getElementById('submit-button-spinner');
  const submitText = document.getElementById('submit-button-text');

  // Show the spinner and remove the text.
  submitReportBtn.setAttribute('disabled', true);
  spinner.classList.replace('hidden', 'inline');
  submitText.classList.add('hidden');

  const url = BASE_URL + '/reports';
  const payload = { name, phone, description };

  if (coords) {
    payload['longitude'] = coords['longitude'];
    payload['latitude'] = coords['latitude'];
  }

  axios
    .post(url, payload, HEADERS)
    .then((response) => {
      submitReportBtn.removeAttribute('disabled');
      spinner.classList.replace('inline', 'hidden');
      submitText.classList.remove('hidden');

      reportForm.reset();
      modal.openModal('report-submitted-modal');
    })
    .catch((error) => {
      console.log('An error, in deed, occurred.', error);

      submitReportBtn.removeAttribute('disabled');
      spinner.classList.replace('inline', 'hidden');
      submitText.classList.remove('hidden');

      alert('Error submitting report');
    });
};

document.addEventListener('DOMContentLoaded', function () {
  modal.init();

  const reportForm = document.getElementById('report-form');
  reportForm.addEventListener('submit', submitReport);
});
