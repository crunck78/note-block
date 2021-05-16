function hideElement(id){
    document.getElementById(id).classList.add("d-none");
}

function showElement(id){
    document.getElementById(id).classList.remove("d-none");
}

function getStorageArray(key){
    return  JSON.parse(localStorage.getItem(key)) || [];
}

function updateStorageArray(key, array){
    localStorage.setItem(key, JSON.stringify(array));
}