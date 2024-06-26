// Sample data from the database
const data = [
    {name:'start',points:0},
    { name: 'Invitation received', points: 100 },
    { name: 'Personal details', points: 250 },
    { name: 'Application details', points: 400 },
    { name: 'Confirmation', points: 500 }
];

const username=window.location.pathname.split("/")[2];

window.addEventListener("DOMContentLoaded",(e)=>{
    fetch(`/api/milestone/${username}`)
    .then(res=>res.json())
    .then(data=>{
        document.getElementById('current_points').innerText=`You have ${data.points} points`;
        generateProgressBar(data.milestone,parseInt(data.points));
    })
    .catch(err=>{
        console.log(err)
    })
})

function generateProgressBar(data, currentPoints) {
    const progressSteps = document.getElementById('progress-steps');
    const progressLabels = document.getElementById('progress-labels');

    // Clear existing content
    progressSteps.innerHTML = '';
    progressLabels.innerHTML = '';

    data.forEach((level, index) => {
        const isCompleted = currentPoints >= level.points;
        const isCurrent = currentPoints >= level.points && (index === data.length - 1 || currentPoints < data[index + 1].points);

        // Create progress step
        const stepDiv = document.createElement('div');
        stepDiv.classList.add('flex-1');

        const stepCircle = document.createElement('div');
        stepCircle.classList.add('w-10', 'h-10', 'mx-auto', 'rounded-full', 'text-lg', 'flex', 'items-center', 'justify-center');
        stepCircle.classList.add(isCompleted ? 'completed-step' : 'bg-white', isCompleted ? 'text-white' : 'upcoming-step', 'border-2');

        const stepIcon = document.createElement('span');
        stepIcon.classList.add('text-center', 'w-full');
        if (isCompleted) {
            stepIcon.innerHTML = '<i class="fa fa-check"></i>';
        } else {
            stepIcon.textContent = index;
            stepIcon.classList.add('text-grey-darker');
        }

        stepCircle.appendChild(stepIcon);
        stepDiv.appendChild(stepCircle);
        progressSteps.appendChild(stepDiv);

        // Create progress bar
        if (index < data.length - 1) {
            const barContainer = document.createElement('div');
            barContainer.classList.add('w-1/6', 'align-center', 'items-center', 'align-middle', 'content-center', 'flex');

            const barWrapper = document.createElement('div');
            barWrapper.classList.add('w-full', 'rounded', 'items-center', 'align-middle', 'align-center', 'flex-1', 'bg-grey-light');

            const progressBar = document.createElement('div');
            progressBar.classList.add('progress-bar', 'text-xs', 'leading-none', 'py-1', 'text-center', 'text-grey-darkest', 'rounded');
            progressBar.classList.add(isCompleted ? 'completed-bar' : 'upcoming-bar');

            if (isCurrent) {
                const nextPoints = data[index + 1].points;
                const progressWidth = ((currentPoints - level.points) / (nextPoints - level.points)) * 100;
                progressBar.style.width = `${progressWidth}%`;
            } else {
                progressBar.style.width = isCompleted ? '100%' : '0%';
            }

            barWrapper.appendChild(progressBar);
            barContainer.appendChild(barWrapper);
            progressSteps.appendChild(barContainer);
        }

        // Create progress label
        const labelDiv = document.createElement('div');
        labelDiv.classList.add('w-1/5');
        labelDiv.textContent = level.name;
        progressLabels.appendChild(labelDiv);
    });
}

