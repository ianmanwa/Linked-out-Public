let jobs = [];

async function fetchJobs() {
    const res = await fetch("http://localhost:5000/jobs");
    const data = await res.json()
    jobs = data;

    renderJobs()
}

fetchJobs()

// Listen to Jobs form and add new job to array
document.getElementById("job-form").addEventListener("submit", function (e) {
    e.preventDefault()

    const title = document.getElementById("job-title").value
    const company = document.getElementById("job-company").value
    const url = document.getElementById("job-url").value
    const tag = document.getElementById("job-tag").value
    const rating = document.getElementById("job-rating").value

    const newJob = { title, company, url, tag, rating, comments: [] }
    jobs.unshift(newJob)

    renderJobs();
    e.target.reset();

    document.getElementById("form-div").style.display = "none"

    //Send new Job to backend
    async function sendJob() {
        await fetch("http://localhost:5000/jobs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newJob)
        })
    }

    sendJob()

})

//open job form
document.getElementById("post-button").addEventListener("click", function (e) {
    document.getElementById("form-div").style.display = "flex"
})


//Close job form
document.getElementById("close-form").addEventListener("click", function (e) {
    document.getElementById("form-div").style.display = "none"
})

//Renders jobs to the screen
function renderJobs() {
    const jobList = document.getElementById("jobs-list");
    jobList.innerHTML = "";

    jobs.forEach((job, index) => {
        
        jobList.innerHTML += 
        `
        <div id="jobs-div-${index}" class="jobs-div">
        <h2>Job: ${job.title}</h2>
        <p>Company: ${job.company}</p>
        <a href="${job.url}" target="_blank"> View original job </a>
        <p>Tag: ${job.tag}</h2>
        <p>Comment: ${job.rating}</p>

        <h5 data-comment="commentButton" data-index ="${index}" data-id="${job._id}"> Comments </h5>
        </div>
        `
        
        // Change job color based on tag
        const jobDiv = `jobs-div-${index}`
        if (job.tag === "good") {
            document.getElementById(jobDiv).style.backgroundColor="lightgreen";
        } else if(job.tag === "ghost") {
            document.getElementById(jobDiv).style.backgroundColor ="rgba(211, 211, 0, 0.72)";
        }
        else if(job.tag === "scam") {
            document.getElementById(jobDiv).style.backgroundColor="lightCoral";
        }
        
    })
}

function renderComments(index, id) {
    const jobList = document.getElementById("jobs-list");
    jobList.innerHTML = "";

    job = jobs[index]
        jobList.innerHTML =
    `
    <div id="jobs-div-${index}" class="jobs-div">
        <h2>Job: ${job.title}</h2>
        <p>Company: ${job.company}</p>
        <a href="${job.url}" target="_blank"> View original job </a>
        <p>Tag: ${job.tag}</h2>
        <p>Comment: ${job.rating}</p>
    </div>
    
    <div>
    <form class="comment-form" data-index="${index}" data-id="${id}">
    <input type="text" placeholder="comment..." required>
    <button type="submit"> Comment <button>
    </form>
    </div>
    
    ${jobs[index].comments.map(c => `<p class="comm-p"> ${c} </p>`).join("")}

    `

    // Change job color based on tag
        const jobDiv = `jobs-div-${index}`
        if (job.tag === "good") {
            document.getElementById(jobDiv).style.backgroundColor="lightgreen";
        } else if(job.tag === "ghost") {
            document.getElementById(jobDiv).style.backgroundColor ="rgba(211, 211, 0, 0.72)";
        }
        else if(job.tag === "scam") {
            document.getElementById(jobDiv).style.backgroundColor="lightCoral";
        }

    
}

// When comments is clicked 
document.addEventListener("click", function (e) {
    if (e.target.dataset.comment === "commentButton") {
        const index = e.target.dataset.index
        const id = e.target.dataset.id

        document.getElementById("comments-list").style.display = "block"
        renderComments(index, id)

    }
})

//When comment form is submitted
document.addEventListener("submit", function (e) {
    if (e.target.classList.contains("comment-form")) {
        e.preventDefault()
        const index = e.target.getAttribute("data-index")
        const comment = e.target.querySelector("input").value
        const id = e.target.getAttribute("data-id")

        jobs[index].comments.unshift(comment);


        //Post new Comment to database
        async function sendComment() {
            await fetch(`http://localhost:5000/comments/${id}`, {
                method: "PATCH",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ comment })
            })
        }


        sendComment()
        renderComments(index, id)
        fetchJobs()

    }
})

// Close comment form
document.addEventListener("click", function (e) {
    if (e.target.dataset.close === "closeComments") {
        document.getElementById("comments-list").style.display = "none"
    }
})




