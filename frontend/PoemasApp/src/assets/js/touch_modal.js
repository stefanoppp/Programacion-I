window.onload = ()=>
{
  let url = window.document.URL.split("/")
  url = url[url.length-1].split(".")[0]
  switch(url)
  {
    case "dashboard_user":
      editUser()
      break;
    case "poema":
      resenaPoema()
      break;
  }
}

function editUser()
{
  const btnEdit = document.getElementById("editar_perfil")
  btnEdit.addEventListener("click",()=>
  {
    const userName = document.getElementById("userName")
    const userEmail = document.getElementById("userEmail")
    const modalUser = document.getElementById("modalUser")
    const modalEmail = document.getElementById("modalEmail")
    modalUser.value = userName.innerText
    modalEmail.value = userEmail.innerText
  })
}


