window.addEventListener('load',()=>{
    [...document.querySelectorAll('#content .col2 ul li a')].forEach((elem)=>{
        if(elem.getAttribute('href') == "#"){
            elem.addEventListener('click',(event)=>{
                event.preventDefault();
                window.localStorage.setItem('samvel_directory_current_cat', elem.textContent);
                window.location.href = "/views/category.html";
            });
        }
        if(elem.getAttribute('has-page')) {
            console.log("Has Page Attributes");
            console.log(elem);
            elem.addEventListener('click',(event)=>{
                event.preventDefault();
                window.localStorage.setItem('samvel_directory_current_cat', elem.textContent);
                window.location.href = elem.getAttribute('href');
            });
        }
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