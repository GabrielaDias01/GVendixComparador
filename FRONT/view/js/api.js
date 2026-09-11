const baseUrl = "http://localhost:3000/"

function obterUsuarios(){
    return fetch(`${baseUrl}usuarios`)
    .then(res => res.json());
}