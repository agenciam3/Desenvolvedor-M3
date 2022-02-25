const accordion = document.querySelector('[data-js="accordion"]');

accordion.addEventListener("click", (e) => {
  const accordionHeaderId = e.target.dataset.accordionHeader;
  const accordionItensToBeOpened = document.querySelector(
    `[data-accordion-body="${accordionHeaderId}"]`
  );

  accordionItensToBeOpened.classList.toggle(`active`);
});
