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

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove__tag")) {
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

inputTags.addEventListener("keypress", async (evento) => {
    if(evento.key === "Enter") {
        evento.preventDefault();
        const tagText = inputTags.value.trim();
        if (tagText !== ""){
            try {
                const tagExiste = await verificaTagsDisponiveis(tagText);
                if (tagExiste) {
                    const newTag = document.createElement("li");
                    newTag.innerHTML = `<p>${tagText}</p> <img src="./img/close-black.svg" class="remove__tag">`
                    listaTags.appendChild(newTag);
                    inputTags.value = "";
                } else {
                    alert("Tag não encontrada")
                }
                
            } catch (error) {
                alert ("Erro ao verificar a existência da tag");
            }
        }
            
    }
})



async function publicarProjeto(nomaDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;

            if (deuCerto) {
                resolve("Projeto publicado com sucesso")
            }else {
                reject("Erro ao publicar o projeto")
            }
        }, 2000)
    })
}

const botaoPublicar = document.querySelector(".botao__publicar");
botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomaDoProjeto = document.querySelector("#nome").value;
    const descricaoDoProjeto = document.querySelector("#descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try {
        const resultado = await publicarProjeto(nomaDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resultado);
        alert("Deu tudo certo")
    } catch (error) {
        console.log("Deu errado: ", error)
        alert("Deu tudo errado!")
    }

})

const botaoDescartar = document.querySelector(".botao__descartar");

botaoDescartar.addEventListener("click", (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "image_projeto.png";

    listaTags.innerHTML = "";
})