class WarningHandler {
  static showWarning(message, error = true) {
    const warning = document.createElement("div");
    const warning__status = document.createElement("div");
    const warning__title = document.createElement("span");
    const warning__close = document.createElement("button");
    const warning__message = document.createElement("div");
    const warning__bar = document.createElement("div");

    if (error) {
      warning__bar.style.backgroundColor = "#FF2253";
    }

    warning.classList.add("warning");
    warning__status.classList.add("warning__status");
    warning__title.classList.add("warning__title");
    warning__title.innerText = "Status";
    warning__close.classList.add("warning__close");
    warning__close.innerText = "X";
    warning__message.classList.add("warning__message");
    warning__message.innerText = message;
    warning__bar.classList.add("warning__bar");

    warning__close.addEventListener("click", () => {
      this.clearWarnings();
    });

    warning.append(warning__status, warning__message, warning__bar);
    warning__status.append(warning__title, warning__close);

    document.body.appendChild(warning);

    setTimeout(() => {
      warning__bar.style.width = "0px";
    }, 100);

    setTimeout(() => {
      warning.style.transform = "translate(1000px)";
      warning.style.transition = "all 0.4s ease-out";
    }, 6000);

    setTimeout(() => {
      warning.remove();
    }, 7000);
  }

  static clearWarnings() {
    document.querySelectorAll(".warning").forEach((item) => {
      item.remove();
    });
  }
}

export default WarningHandler;
