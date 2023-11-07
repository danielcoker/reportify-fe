const BASE_URL = 'https://reportify-pqlb.onrender.com/api/v1';
const HEADERS = { 'Content-Type': 'application/json' };

const submitReport = (event) => {
  event.preventDefault();

  const reportForm = document.getElementById('report-form');
  const description = document.getElementById('description-input').value;
  const submitReportBtn = document.getElementById('submit-report-button');
  const spinner = document.getElementById('submit-button-spinner');
  const submitText = document.getElementById('submit-button-text');

  // Show the spinner and remove the text.
  submitReportBtn.setAttribute('disabled', true);
  spinner.classList.replace('hidden', 'inline');
  submitText.classList.add('hidden');

  const url = BASE_URL + '/reports';
  const payload = { description };

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

      // Pending deployment for the backend APIs, simulate success on error.
      reportForm.reset();
      modal.openModal('report-submitted-modal');

      //   alert('Error submitting report');
    });
};

document.addEventListener('DOMContentLoaded', function () {
  modal.init();

  const reportForm = document.getElementById('report-form');
  reportForm.addEventListener('submit', submitReport);
});
