const form = document.querySelector('form')
const titleInput = document.querySelector('#title-input')
const locationInput = document.querySelector('#location-input')
const descInput = document.querySelector('#desc-input')
const salaryInput = document.querySelector('#salary-input')
const stateSelect = document.querySelector('#state-select')
const jobList = document.querySelector('#job-list')
const randomBtn = document.querySelector('#random')
const salaryBtn = document.querySelector('#salary')


function handleSubmit(e) {
    e.preventDefault()

    if (titleInput.value < 1) {
        alert('Please enter a job title')
        return
    }

    if (locationInput.value < 1) {
        alert('Please enter a job location')
        return
    }

    if (descInput.value < 1) {
        alert('Please enter a job description')
        return
    }

    if (!salaryInput.value) {
        alert('Please enter an annual salary')
        return
    }

    let body = {
        title: titleInput.value,
        stateId: +stateSelect.value,
        location: locationInput.value,
        salary: salaryInput.value,
        description: descInput.value
    }


    axios.post('http://localhost:4000/jobs', body)
        .then(() => {
            stateSelect.value = 1
            titleInput.value = ''
            locationInput.value = ''
            descInput.value = ''
            salaryInput.value = 0
            getJobs()
        })
}

function deleteCard(id) {
    axios.delete(`http://localhost:4000/jobs/${id}`)
        .then(() => getJobs())
        .catch(err => console.log(err))
}

function updateJob(id) {

    const updatedTitle = prompt("Enter updated job title:");
    const updatedSalary = prompt("Enter updated job salary:");
    const updatedLocation = prompt("Enter updated job location:");
    const updatedDescription = prompt("Enter updated job description:");

    let jobUpdate = {
        title: updatedTitle,
        salary: updatedSalary,
        location: updatedLocation,
        description: updatedDescription
    }

    axios.put(`http://localhost:4000/jobs/${id}`, jobUpdate)
        .then(res => {
            console.log(jobUpdate.title)
            console.log(jobUpdate.salary)
            console.log(jobUpdate.location)
            console.log(jobUpdate.description)
            alert("Please refresh the browser after updating!")
        })
        .catch(err => {
            console.log(err)
        })

}

function getJobs() {
    jobList.innerHTML = ''

    axios.get('http://localhost:4000/jobs/')
        .then(res => {
            res.data.forEach(elem => {
                let jobCard = `
                    <div class="job-card">
                    <h2>${elem.title}</h2>
                    <h3>State: ${elem.state}</h3>
                    <h3>Location: ${elem.location}</h3>
                    <h3>Salary: ${elem.salary}</h3>
                    <h3>Description: ${elem.description}</h3>
                    <button class="deleteBtn" onclick="deleteCard(${elem['job_id']})">Delete</button>
                    <button class="updateBtn" onclick="updateJob(${elem['job_id']})">Update</button>
                    </div>
                `
                jobList.innerHTML += jobCard
            })
        })
}

function getSalaryJobs() {
    jobList.innerHTML = ''

    axios.get('http://localhost:4000/jobs/salary')
        .then(res => {
            res.data.forEach(elem => {
                let jobCard = `
                    <div class="job-card">
                    <h2>${elem.title}</h2>
                    <h3>Salary: ${elem.salary}</h3>
                    <h3>State: ${elem.state}</h3>
                    <h3>Location: ${elem.location}</h3>         
                    <h3>Description: ${elem.description}</h3>
                    <button class="deleteBtn" onclick="deleteCard(${elem['job_id']})">Delete</button>
                    <button class="updateBtn" onclick="updateJob(${elem['job_id']})">Update</button>
                    </div>
                `
                jobList.innerHTML += jobCard
            })
        })
}


function getStates() {
    axios.get('http://localhost:4000/states')
        .then(res => {
            res.data.forEach(state => {
                const option = document.createElement('option')
                option.setAttribute('value', state['state_id'])
                option.textContent = state.state_name
                stateSelect.appendChild(option)
            })
        })
}

function getRandomJobNews() {
    axios.get('http://localhost:4000/news')
        .then(res => {
            const data = res.data;
            alert(data);
        });
}


//Modal 
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}


getStates()
getJobs()
form.addEventListener('submit', handleSubmit)
randomBtn.addEventListener('click', getRandomJobNews)
salaryBtn.addEventListener('click', getSalaryJobs)