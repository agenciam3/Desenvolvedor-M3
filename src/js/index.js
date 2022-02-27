category();

function orderByDesktop() {
  const accordion = document.querySelector(".botton-accordion");

  accordion.addEventListener("click", (e) => {
    const accordionHeaderId = e.target.dataset.accordionHeader;
    const accordionItensToBeOpened = document.querySelector(
      `[data-accordion-body="${accordionHeaderId}"]`
    );
    accordionItensToBeOpened.classList.toggle(`active`);
  });
}

function seeMore() {
  const optionColor = document.querySelector(".option-color-seeMore");

  optionColor.addEventListener("click", (e) => {
    // if (e.target != this) return;
    {
      const optionColorHeaderId = e.target.dataset.colorOptionHeader;
      const optionColorItensToBeOpened = document.querySelector(
        `[data-color-option-body="${optionColorHeaderId}"]`
      );

      optionColorItensToBeOpened.classList.toggle(`active`);

      // if (e.target && e.target.parentNode) {
      //   e.target.parentNode.removeChild(e.target);
      // }
    }
  });
}

function category() {
  orderByDesktop();
  seeMore();
}
