const imgContainerElem = document.getElementById('image-container');
const btnElem = document.querySelector('.btn');

btnElem.addEventListener("click", ()=>{
    imgNumber = 4;
    addNewImgs();
});

function addNewImgs (){
    for(let i = 0; i < imgNumber; i++){
        const newImgElem = document.createElement("img");
        let randomImgId = Math.floor(Math.random() * 2000);
        newImgElem.src = `https://picsum.photos/300?random= ${randomImgId}`;
        imgContainerElem.appendChild(newImgElem);
    }
};