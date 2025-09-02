const jobs = [];

//Post job button listener
document.getElementById("post-button").addEventListener("click", function(e){
document.getElementById("job-form").style.display="flex";
})

//Catch job submission and save to main Array
document.getElementById("job-form").addEventListener("submit", function(e) {

    e.preventDefault()

    const title = document.getElementById("job-title").value
    const url = document.getElementById("job-url").value
    const rating = document.getElementById("job-rating").value

    const newJob = { title, url, rating, comments:[] }
    jobs.push(newJob)

    renderJobs()
    e.target.reset()
})

function renderJobs(){
    const jobList = document.getElementById("jobs-list")
    jobList.innerHTML="";

    jobs.forEach((job,index) =>{
        jobList.innerHTML+=`
        <div class="list-container">
        <div class="jobs-list">
        <h3> Job Title: ${job.title} </h3>
        <p> Rating: ${job.rating} </p>
        <a href="${job.url}" target=_blank> Click to View Job</a>

        <div data-comment = "openComm" data-index="${index}"> Comments </div>
        </div>
        </div>
        `
    })

    document.getElementById("job-form").style.display="none";
}

function renderComments(){

}