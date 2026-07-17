const cloudName = "dtbxzd7ux";
const folder = "gallery";

const galleryGrid = document.getElementById("galleryGrid");


fetch(
`https://res.cloudinary.com/${cloudName}/image/list/${folder}.json`
)

.then(res=>res.json())

.then(data=>{


data.resources.forEach(img=>{


let url =
`https://res.cloudinary.com/${cloudName}/image/upload/${img.public_id}.${img.format}`;



galleryGrid.innerHTML += `

<div class="photo">

<img 
src="${url}"
loading="lazy"
class="rounded-2xl w-full">

</div>

`;



});


});