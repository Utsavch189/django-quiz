const rank_container=document.getElementById("rank-container");
let page=1;
let page_size=10;
const next_btn=document.getElementById("next");
const prev_btn=document.getElementById("prev");
let total_records=0;

window.addEventListener("DOMContentLoaded",(e)=>{
    data_fetch(page,page_size);
})

const data_fetch=(page,page_size)=>{
    fetch(`/api/rank-board/page=${page}&page-size=${page_size}`)
    .then(res=>res.json())
    .then(data=>{
        rank_container.innerHTML="";
        data.rankings.map((v,i)=>{
            rank_container.innerHTML+=`<li class="flex items-center justify-between py-2 border-b border-gray-300">
                 <div class="flex items-center">
                     <span class="text-lg font-semibold mr-4">${i+1}</span>
                     <span class="text-gray-800 font-semibold">${v.name}</span>
                 </div>
                 <span class="text-green-500 font-semibold">${v.points} Points</span>
                </li>`
        });
        total_records=data.total_records;
        update_next_prev_buttoon(data.total_records);
        
    })
    .catch(err=>{
        console.log(err)
    })
}

function isLastPage(totalRecords, pageSize, currentPage) {
    const totalPages = Math.ceil(totalRecords / pageSize);
    return currentPage === totalPages;
}

next_btn.addEventListener("click",(e)=>{
    if (isLastPage(total_records,page_size,page)){
        return;
    }
    page=page+1
    data_fetch(page,page_size);
})

prev_btn.addEventListener("click",(e)=>{
    if (page===1){
        return;
    }
    page=page-1
    data_fetch(page,page_size);
})

const update_next_prev_buttoon=(total_records)=>{
    console.log(total_records,page,page_size)
    if(page===1){
        // first page
        if(isLastPage(total_records,page_size,page)){
            //last page
            prev_btn.classList.add('bg-gray-400');
            next_btn.classList.add('bg-gray-400');
            return;
        }
        prev_btn.classList.add('bg-gray-400');
        next_btn.classList.remove('bg-gray-400');
        return;
    }
    if(isLastPage(total_records,page_size,page)){
        //last page
        prev_btn.classList.remove('bg-gray-400');
        next_btn.classList.add('bg-gray-400');
        return;
    }
    else{
        prev_btn.classList.remove('bg-gray-400');
        next_btn.classList.remove('bg-gray-400');
        return;
    }
}
