function Ajax(url, selector, push = true) {
  if (!url || !selector) return;

  const element = document.querySelector(selector);

  fetch(url)
    .then((answer) => answer.text())
    .then((html) => {
      element.innerHTML = html;
      if (push) {
        history.pushState({ selector }, null, url);
      }
    });
}

function removeClass() {
  document.querySelectorAll("[web-link]").forEach((a) => {
    a.classList.remove("menu-selected");
  });
}

document.querySelectorAll("[web-link]").forEach((link) => {
  const url = link.attributes["web-link"].value;
  const selectorDestiny = link.attributes["web-destiny"].value;

  link.onclick = (e) => {
    e.preventDefault();
    Ajax(url, selectorDestiny);
    removeClass();
    link.classList.add("menu-selected");
  };

  window.onpopstate = (e) => {
    if (e.state) {
      Ajax(window.location.href, e.state.selector, false);
    }
  };
});

function fetchFunction(event) {
  event.preventDefault();

  const form = document.forms[0];
  const dt = new FormData(form);

  const data = {
    name: document.getElementById("name").value,
    obs: document.getElementById("obs").value,
  };

  if (!data.name) {
    window.alert("Preencha o campo nome");
    return;
  } else {
    const params = { method: "POST", body: new URLSearchParams(dt) };
    fetch(form.action, params).catch((error) => console.log(error));
    window.alert("Nome cadastrado! Clique no menu novamente para atualizar a página")
    
    if(form.name == "formHistorico") {
      form.name.value = "";
      form.obs.value = "";
      form.date.value = "";
      form.price.value = "";
    } else {
      form.name.value = "";
      form.obs.value = "";
    }
  }
}

function deleteReport(event) {
  const img = event.currentTarget;
  const id = img.alt;
  const params = { method: "DELETE" };
  fetch(`/apagar/${id}`, params).catch((error) => console.log(error));
  img.parentNode.parentNode.remove();
}

function deleteUsers(event) {
  const img = event.currentTarget;
  const id = img.alt;
  const params = { method: "DELETE" };
  fetch(`/apagar-usuarios/${id}`, params).catch((error) => console.log(error));
  img.parentNode.parentNode.remove();
}