const submitReport = (event) => {
  event.preventDefault();

  const description = document.getElementById('description-input').value;

  console.log(description);

  modal.openModal('report-submitted-modal');
};

document.addEventListener('DOMContentLoaded', function () {
  modal.init();

  const reportForm = document.getElementById('reportForm');

  reportForm.addEventListener('submit', submitReport);
});
