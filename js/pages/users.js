import {findAllUsers, editUA} from "../api/admin.js";

function getFixedNumber(str){
    if(str < 10){
        return "0"+str;
    }
    return str;
}

window.addEventListener('load',async()=>{
    const table = document.querySelector('table');
    findAllUsers().then(response=>{
        console.log(response);
        response.data.forEach(ua=>{
            const tr = document.createElement('tr');
            const tdUsername = document.createElement('td');
            const tdName = document.createElement('td');
            const tdComment = document.createElement('td');
            const tdButton = document.createElement('td');
            const dateOfEnter = document.createElement('td');
            const dateLogin = new Date(ua.dateOfEnter);
            const commentButton = document.createElement('button');
            const textarea = document.createElement('textarea');
            textarea.setAttribute('ua-id',ua._id);
            textarea.setAttribute("hidden","hidden");
            textarea.value = ua.comment;
            commentButton.textContent = "Comment";
            commentButton.classList.add("btn");
            commentButton.classList.add("btn-success");
            commentButton.setAttribute('ua-id',ua._id);
            tdButton.append(commentButton);
            tdUsername.textContent = ua.username;
            tdName.textContent = ua.name;
            tdComment.setAttribute('ua-id',ua._id);
            tdComment.textContent = ua.comment;
            dateOfEnter.textContent = ua.dateOfEnter ? `${getFixedNumber(dateLogin.getFullYear())}-${getFixedNumber(dateLogin.getMonth()+1)}-${getFixedNumber(dateLogin.getDate())}  ${getFixedNumber(dateLogin.getHours())}:${getFixedNumber(dateLogin.getMinutes())}:${getFixedNumber(dateLogin.getSeconds())}` : "-";
            tr.append(tdUsername);
            tr.append(tdName);
            tr.append(dateOfEnter);
            tr.append(tdComment);
            tr.append(textarea);
            tr.append(tdButton);
            table.append(tr);
            const docTextarea = document.querySelector(`textarea[ua-id="${ua._id}"]`);
            document.querySelector(`button[ua-id="${ua._id}"]`).addEventListener('click',(event)=>{
                if(docTextarea.getAttribute("hidden")){
                    docTextarea.removeAttribute("hidden")
                }
                else{
                    editUA(event.target.getAttribute('ua-id'),docTextarea.value).then(res=>{
                        console.log(res);
                        console.log(document.querySelector(`td[ua-id="${ua._id}"]`));
                        document.querySelector(`td[ua-id="${ua._id}"]`).textContent = docTextarea.value;
                    });
                    docTextarea.setAttribute("hidden","hidden");
                }
            });
        });
    });
    document.querySelector('#blog-link').addEventListener('click',(event)=>{
        event.preventDefault();
        if(window.localStorage.getItem('samvel_directory_user_token')){
            window.location.href = "/views/blog.html";
        }
        else{
            window.location.href = "/views/login.html";
        }
    });
});