const splitted_date=new Date().toISOString().split("T")[0];
// const splitted_time=date.split("T")[1].split(".")[0];



const remaining_div=document.querySelector(".remaining_div");
const time_Div=document.querySelector(".time_Div");
const time_has_come=document.querySelector(".time_has_come");
const date_input=document.getElementById("date");
const form=document.getElementById("form");
const time_spans=document.querySelectorAll("span");
const reset_button=document.getElementById("reset_button");
const complete_button=document.getElementById("complete_button");



date_input.setAttribute("min",splitted_date);
// date inputa bugunden önceki tarihleri seçme diyicem bunu min attributesi ile yapabilirim 


const second=1000;
const minute=second*60;
const hour=minute*60;
const day=hour*24;
// burada hepsini milisaniyeye çevirdim 

let choosen_date="";
let recieved_date="";
let currentInterval;
let local_storage_time;
function updateDOM(){
        currentInterval = setInterval(() => {
        const now=new Date().getTime();
        //  milisaniye cinsinden şimdiki zamanı aldım 
        const between_date=recieved_date-now
        const left_days=Math.floor(between_date/day);
        const left_hour=(Math.floor((between_date%day) / hour))-3;
        const left_minutes=Math.floor((between_date%hour)/ minute);
        const left_second=Math.floor((between_date%minute)/second);
        // günler arasında milisaniye cinsinden dönen değerin saatle bölümünden kalanı saniyeye böl 
        remaining_div.hidden=true;
        time_Div.hidden=false; 
        time_spans[0].textContent=`${left_days}`;
        time_spans[1].textContent=`${left_hour}`;
        time_spans[2].textContent=`${left_minutes}`;
        time_spans[3].textContent=`${left_second}`;
        if(between_date<0){
            time_has_come.hidden=false;
            remaining_div.hidden=true;
            time_Div.hidden=true;
            clearInterval(currentInterval);
        }
    }, 1000);
}

function reset(){
    clearInterval(currentInterval);
    remaining_div.hidden=false;
    time_Div.hidden=true; 
    time_has_come.hidden=true;
    localStorage.removeItem("time");
};

function getCurrentDate(e){
    e.preventDefault();
    // let is_valid=form.checkValidity();
    let choosen_date=form.date.value;
    // formun içinde id si date olanın içindeki değeri bana getir demek 
    // sayfamı yenilediğimde tüm verilerim sıfırlanmakta ben bunu tutmak istiyorum yenilense bile 
    local_storage_time={
        date:choosen_date
    }
    const result=JSON.stringify(local_storage_time);
    console.log(result);
    // local storage sadece json stringi set edebilirim
    localStorage.setItem("time",result);
    
    
    if(choosen_date==""){
        alert("Enter A Valid Date");
    }
    else{
        recieved_date=new Date(choosen_date).getTime();
        // seçtiğim tarihi bana kaç milisaniye ise döndürür
        updateDOM();
    }
    
}
function refreshTime(){
    if(localStorage.getItem("time")){
        remaining_div.hidden=true;
        // locale storagede time objesi varsa eğer buraya girer
        local_storage_time=JSON.parse(localStorage.getItem("time"));
        console.log(local_storage_time);
        // json stringini javascript objesine çeviriyorum 
        choosen_date=local_storage_time.date;
        recieved_date=new Date(choosen_date).getTime();
        updateDOM();
    }
}

form.addEventListener("submit",getCurrentDate);
reset_button.addEventListener("click",reset);
complete_button.addEventListener("click",reset);

refreshTime();














