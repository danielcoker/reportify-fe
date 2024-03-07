const BASE_URL = 'https://reportify-b3xwl.ondigitalocean.app/api/v1';
const HEADERS = { 'Content-Type': 'application/json' };

document.addEventListener('DOMContentLoaded', function () {
  const spinner = document.getElementById('report-list-loading-spinner');
  const reportList = document.getElementById('report-list');
  const reportTableBody = document.getElementById('report-table-body');

  const url = BASE_URL + '/reports';

  axios
    .get(url, HEADERS)
    .then((response) => {
      console.log(response);
      const data = response.data.data;
      const reports = data.results;

      spinner.classList.replace('inline', 'hidden');
      reportList.classList.remove('hidden');

      reports.forEach((report, idx) => {
        const row = document.createElement('tr');
        row.classList.add('divide-x');

        const tdClassList = ['px-6', 'py-4', 'whitespace-nowrap'];
        const tdDescriptionClassList = [
          ...tdClassList,
          'flex',
          'items-center',
          'gap-x-6',
        ];

        const id = document.createElement('td');
        id.classList.add(...tdClassList);

        const description = document.createElement('td');
        description.classList.add(...tdDescriptionClassList);

        const category = document.createElement('td');
        category.classList.add(...tdClassList);

        const createdAt = document.createElement('td');
        createdAt.classList.add(...tdClassList);

        const location = document.createElement('td');
        location.classList.add(...tdClassList, 'capitalize');

        // Format date.
        const dateObj = new Date(report.created_at);
        const options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        };
        const formattedDate = dateObj.toLocaleDateString('en-US', options);

        // Set TD values.
        id.textContent = idx + 1;
        description.textContent = report.description;
        category.textContent = report.category.name;
        createdAt.textContent = formattedDate;
        location.textContent = report.location;

        row.appendChild(id);
        row.appendChild(description);
        row.appendChild(category);
        row.appendChild(createdAt);
        row.appendChild(location);

        reportTableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.log('An error, in deed, occurred.', error);
      alert('Error fetching reports');
    });
});
