document.addEventListener('DOMContentLoaded', function() {
    const fundraiserTableBody = document.querySelector('#fundraiserTable tbody');
    const newFundraiserForm = document.getElementById('newFundraiserForm');
    const updateFundraiserForm = document.getElementById('updateFundraiserForm');

    // Function to fetch and display fundraisers
    function loadFundraisers() {
        fetch('http://localhost:3060/api/fundraisers') // Adjust the URL based on your API's route
            .then(response => response.json())
            .then(data => {
                fundraiserTableBody.innerHTML = ''; // Clear the table first
                data.forEach(fundraiser => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${fundraiser.FUNDRAISER_ID}</td>
                        <td>${fundraiser.ORGANIZER}</td>
                        <td>${fundraiser.CAPTION}</td>
                        <td>${fundraiser.TARGET_FUNDING}</td>
                        <td>${fundraiser.CURRENT_FUNDING}</td>
                        <td>${fundraiser.CITY}</td>
                        <td>${fundraiser.CATEGORY_ID}</td>
                        <td>${fundraiser.ACTIVE ? 'Yes' : 'No'}</td>
                        <td>
                            <button onclick="deleteFundraiser(${fundraiser.FUNDRAISER_ID})">Delete</button>
                        </td>
                    `;
                    fundraiserTableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error loading fundraisers:', error));
    }

    // Function to insert a new fundraiser
    newFundraiserForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const fundraiserData = {
            ORGANIZER: document.getElementById('organizer').value,
            CAPTION: document.getElementById('caption').value,
            TARGET_FUNDING: document.getElementById('targetFunding').value,
            CURRENT_FUNDING: 0,  // Initialize with 0 funding
            CITY: document.getElementById('city').value,
            ACTIVE: document.getElementById('active').value,
            CATEGORY_ID: document.getElementById('category').value
        };

        fetch('http://localhost:3060/api/fundraisers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fundraiserData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.insert === 'success') {
                alert('Fundraiser inserted successfully!');
                loadFundraisers();
                newFundraiserForm.reset();
            } else {
                alert('Error inserting fundraiser');
            }
        })
        .catch(error => console.error('Error inserting fundraiser:', error));
    });

    // Function to update an existing fundraiser
    updateFundraiserForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const fundraiserId = document.getElementById('fundraiserId').value;
        const updatedFundraiserData = {
            FUNDRAISER_ID: fundraiserId,
            ORGANIZER: document.getElementById('updateOrganizer').value,
            CAPTION: document.getElementById('updateCaption').value,
            TARGET_FUNDING: document.getElementById('updateTargetFunding').value,
            CURRENT_FUNDING: 0,  // Placeholder: update this based on your logic
            CITY: document.getElementById('updateCity').value,
            ACTIVE: document.getElementById('updateActive').value,
            CATEGORY_ID: document.getElementById('updateCategory').value
        };

        fetch(`http://localhost:3060/api/fundraisers`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFundraiserData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.update === 'success') {
                alert('Fundraiser updated successfully!');
                loadFundraisers();
                updateFundraiserForm.reset();
            } else {
                alert('Error updating fundraiser');
            }
        })
        .catch(error => console.error('Error updating fundraiser:', error));
    });

    // Function to delete a fundraiser
    function deleteFundraiser(fundraiserId) {
        if (confirm('Are you sure you want to delete this fundraiser?')) {
            fetch(`http://localhost:3060/api/fundraisers/${fundraiserId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.delete === 'Delete Sucess') {
                    alert('Fundraiser deleted successfully!');
                    loadFundraisers();
                } else {
                    alert('Error deleting fundraiser');
                }
            })
            .catch(error => console.error('Error deleting fundraiser:', error));
        }
    }

    // Load fundraisers on page load
    loadFundraisers();
});
