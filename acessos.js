
/* ACERVO DA PESQUISA — GOOGLE DRIVE RESTRITO
   Não inserir tokens, senhas ou credenciais.
   O Google Drive controla as permissões de acesso.
*/

(() => {
  "use strict";

  const acessos = [
    {
      titulo: "Acervo completo da pesquisa — CBERS-4A",
      descricao:
        "Acesso aos códigos, imagens, amostras, anotações " +
        "do CVAT, Shapefiles, testes, experimentos e " +
        "arquivos gerados durante a pesquisa.",

      linkDrive:
        "https://drive.google.com/drive/folders/" +
        "1JRnsgbC0uXwUIDamcoCL6B-V128UolRD?usp=sharing"
    }
  ];

  function driveUrl(valor) {
    if (typeof valor !== "string" || !valor.trim()) {
      return null;
    }

    try {
      const url = new URL(valor.trim());

      if (
        url.protocol !== "https:" ||
        url.hostname !== "drive.google.com"
      ) {
        return null;
      }

      return url.href;
    } catch {
      return null;
    }
  }

  function render() {
    const root = document.getElementById("lista-acessos");

    if (!root) return;

    root.replaceChildren();

    for (const acesso of acessos) {
      const card = document.createElement("article");
      card.className = "card acesso-card";

      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = "Google Drive · Acesso controlado";

      const titulo = document.createElement("h3");
      titulo.textContent = acesso.titulo;

      const descricao = document.createElement("p");
      descricao.textContent = acesso.descricao;

      card.append(badge, titulo, descricao);

      const url = driveUrl(acesso.linkDrive);

      if (url) {
        const link = document.createElement("a");

        link.className = "btn outline";
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Solicitar ou acessar a pasta ↗";

        card.append(link);
      }

      root.append(card);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
