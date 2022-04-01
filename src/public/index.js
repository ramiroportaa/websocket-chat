const socket = io();
const chatBox = document.getElementById("chatBox");
const chatLog = document.getElementById("chatLog");
let user;
Swal.fire({
    title: 'Submit your username',
    input: 'text',
    inputValidator: (value)=>{
        return !value && "You need to type a username to login";
    },
    allowOutsideClick: false,
    confirmButtonText: 'Login',
    showLoaderOnConfirm: true,
    preConfirm: (username) => {
        user = username;
    }
});

const render = (data, align)=>{
    const div = document.createElement("div");
    const p = document.createElement("p");
    const span = document.createElement("span");
    const spanHour = document.createElement("span");
    div.className = "d-block border border-white mt-1 py-1 px-2 rounded bg-dark";
    div.style.boxShadow = "0 0 5px gray";
    div.style.width = "max-content";
    div.style.maxWidth = "80%";
    span.className = "fw-bold text-decoration-underline";
    p.className = "text-break ps-1";
    spanHour.className = "d-flex justify-content-end fw-light";
    if (align==="right"){
        div.classList.add("align-self-end");
    }
    span.textContent = `${data.user}: `;
    p.textContent = `${data.message}`;
    const date = new Date(data.date);
    spanHour.textContent = `${date.getHours()}:${date.getMinutes()<10 ?'0':''}${date.getMinutes()}`;
    div.appendChild(span);
    div.appendChild(p);
    div.appendChild(spanHour);
    chatLog.appendChild(div);
    div.scrollIntoView();
};

socket.on("initial", (log)=>{
    log.forEach(data => {
        render(data, data.user == user ? "right" : "left");
    });
});

socket.on("newLog", (data)=>{
    render(data, data.user == user ? "right" : "left");
});

chatBox.addEventListener("keyup", (e)=>{
    if (e.key == "Enter" && chatBox.value.trim()){
        const message = chatBox.value;
        socket.emit("message", {user, message, date: Date.now()});
        chatBox.value = "";
    }
})
