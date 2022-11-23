async function filterAgoraVai() {
    await fetch(productsUrl)
        .then((resp) => resp.json())
        .then((data) => {
            data.map((item) => {
                let checkedValues = [...document.querySelectorAll('.checkboxs')]
                    .filter((input) => (input.value + input.name))
                    .map((input) => console.log(input))
            })
        });

}