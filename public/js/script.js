
// const postContent = document.querySelector(".blog p");
// postContent.textContent = postContent.textContent.substring(0, 101);

const postContentAll = document.querySelectorAll(".blogs-container .blog p");
postContentAll.forEach((postContent) => {
    postContent.textContent = postContent.textContent.substring(0, 200);
})



