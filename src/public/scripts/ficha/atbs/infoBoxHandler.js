const atbsLocation = document.querySelector(".infoBox .atbs")

export async function infoBoxHandler(ficha) {
    const fetchAtbs = await fetch("/assets/others/texts.json")
    const { atbs } = await fetchAtbs.json()

    const atbI1 = atbs.atbsI1
    const atbI1F = atbs.atbsI1F

    let atbBox = document.createElement("div")
    atbBox.classList.add("atbBox")

    for (let i in atbI1) {
        if (ficha.atributos[atbI1[i]] != null && ficha.atributos[atbI1[i]] != "" && ficha.atributos[atbI1[i]] != " " && ficha.atributos[atbI1[i]] != "excluir" && ficha.atributos[atbI1[i]] != "delete" && ficha.atributos[atbI1[i]] != "-") {
            const atb = document.createElement("atb")
            const atbLabel = document.createElement("atbLabel")
            const textArea = document.createElement("textarea")

            atbLabel.innerHTML = atbI1F[i]
            textArea.innerHTML = ficha.atributos[atbI1[i]]

            atb.appendChild(atbLabel)
            atb.appendChild(textArea)

            atbBox.appendChild(atb)
        }

        atbsLocation.appendChild(atbBox)
    }
}