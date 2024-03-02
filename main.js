const getBtn = document.querySelector('#btn');
const section = document.querySelector('#section')

// const btnFunction = () => console.log("button clicked");

getBtn.addEventListener("click", getAlderaanResidents)

// Now, modify the function to make an axios call to SWAPI

function getAlderaanResidents() {
    axios.get('https://swapi.dev/api/planets/?search=Alderaan')
        .then(response => {
            const residentsUrls = response.data.results[0].residents;
            residentsUrls.forEach(residentUrl => {
                axios.get(residentUrl)
                    .then(residentResponse => {
                        const residentName = residentResponse.data.name;
                        const residentHeader = document.createElement('h3');
                        residentHeader.textContent = residentName;
                        section.appendChild(residentHeader);
                    })
                    .catch(error => {
                        console.error('Error fetching resident:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Error fetching Alderaan:', error);
        });
}