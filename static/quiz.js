const main_area = document.getElementById("main-area");
const result_area = document.getElementById("result-area");
const quiz_id=window.location.pathname.split('/')[2]
const user_id=window.location.pathname.split('/')[3]

let answers = {};

document.addEventListener("DOMContentLoaded", (e) => {
    fetch(`/api/questions/${quiz_id}/${user_id}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('heading').innerText = 'Quiz : ' + data.data.name;
            setQuestions(data.data.questions);
        })
        .catch(err => {
            console.log(err)
        })
})

function onChange(id) {
    if (id) {
        const element = document.getElementById(id);
        const ids = id?.split("_")[1];
        const value = element?.value;
        const choosed_option = element?.getAttribute('data_name').split('-')[0];
        answers[ids] = { value: value, choosed_option: choosed_option }

    }

}

function setQuestions(questions) {
    main_area.innerHTML = ''

    questions?.map((q, i) => {
        const html = `<div class="flex flex-col gap-2 my-6">
                <p>Q${q.id}. ${q.question}</p>
                <p>Points. ${q.points}</p>
                <div class="inline-flex items-center">
                    <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor=":html">
                        <input name="${q.id}" data_name="option_1-${q.id}" type="radio"
                            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                            id="opt1_${q.id}" value="${q.option_1}" onclick="onChange('opt1_${q.id}')"/>
                        <span
                            class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16"
                                fill="currentColor">
                                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                            </svg>
                        </span>
                    </label>
                    <label class="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="html">
                        <p class="flex font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-500">
                            ${q.option_1}
                        </p>
                    </label>
                </div>
                <div class="inline-flex items-center">
                    <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="html2">
                        <input name="${q.id}" data_name="option_2-${q.id}" type="radio"
                            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                            id="opt2_${q.id}" value="${q.option_2}" onclick="onChange('opt2_${q.id}')"/>
                        <span
                            class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16"
                                fill="currentColor">
                                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                            </svg>
                        </span>
                    </label>
                    <label class="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="html2">
                        <p class="flex font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-500">
                            ${q.option_2}
                        </p>
                    </label>
                </div>
                <div class="inline-flex items-center">
                    <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="html2">
                        <input name="${q.id}" data_name="option_3-${q.id}" type="radio"
                            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                            id="opt3_${q.id}" value="${q.option_3}" onclick="onChange('opt3_${q.id}')"/>
                        <span
                            class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16"
                                fill="currentColor">
                                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                            </svg>
                        </span>
                    </label>
                    <label class="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="html2">
                        <p class="flex font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-500">
                            ${q.option_3}
                        </p>
                    </label>
                </div>
                <div class="inline-flex items-center">
                    <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="html2">
                        <input name="${q.id}" data_name="option_4-${q.id}" type="radio"
                            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                            id="opt4_${q.id}" value="${q.option_4}" onclick="onChange('opt4_${q.id}')"/>
                        <span
                            class="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16"
                                fill="currentColor">
                                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                            </svg>
                        </span>
                    </label>
                    <label class="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="html2">
                        <p class="flex font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-500">
                            ${q.option_4}
                        </p>
                    </label>
                </div>
            </div>`
        main_area.innerHTML += html
    })
    main_area.innerHTML += `<div class="p-6 pt-0">
            <button
                class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button" onclick="handle_submit()">
                Submit
            </button>
        </div>`
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function handle_submit() {
    const csrftoken = getCookie('csrftoken');
    fetch(`/api/questions/${quiz_id}/${user_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify(answers)
    })
        .then(res => res.json())
        .then(data => {
            main_area.classList.add('hidden');
            result_area.classList.remove('hidden');
            document.getElementById('head-area').classList.add('hidden');
            document.getElementById('score').innerText = data?.marks || 0;
            document.getElementById('points').innerText = data?.gain_points && data?.gain_points + ' points' || 0 + ' points';
            document.getElementById('percentage').innerText = data?.percentage?.toFixed(2) && data?.percentage?.toFixed(2) + '%' || 0.0 + '%';
            document.getElementById('threshold').innerText = `Your Performence Threshold Was ${data?.threshold}%`
            const answersList = document.getElementById('answer-area');
            answersList.innerHTML = '';
            data?.correct_answers.forEach(item => {
                console.log(item)
                const li = document.createElement('li');
                console.log(li)
                li.innerText = `Q: ${item.question} - A: ${item.answer}`;
                answersList.appendChild(li)
            });
        })
        .catch(err => {
            console.log(err)
        })
}
