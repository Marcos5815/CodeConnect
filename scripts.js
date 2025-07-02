const uploadBtn = document.querySelector("#upload__btn");
const inputUpload = document.querySelector("#image__upload");

uploadBtn.addEventListener("click", (evento) => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name});
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`);
        }

        leitor.readAsDataURL(arquivo);
    })
}

const imagemPrincipal = document.querySelector(".container__main__image");
const nomeDaImagem = document.querySelector(".container__imagem__nome p");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo");
        }
    }
})

const inputTags = document.querySelector("#categoria");
const listaTags = document.querySelector(".lista__tags")

inputTags.addEventListener("keypress", (evento) => {
    if(evento.key === "Enter") {
        evento.preventDefault();
        const tagText = inputTags.value.trim();
        if (tagText !== ""){
            const newTag = document.createElement("li");
            newTag.innerHTML = `<p>${tagText}</p> <img src="./img/close-black.svg" class="remove-tag">`
            listaTags.appendChild(newTag);
            inputTags.value = "";
        }
    }
})

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const removerTag = evento.target.parentElement;
        listaTags.removeChild(removerTag);
    }
})

const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "Javascript"]

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout( () => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
    })
}