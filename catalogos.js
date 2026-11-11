
/* ============================================================
   LABORATÓRIO CBERS-4A — APLICATIVO DO SITE

   Biblioteca de códigos
   Banco de amostras automático
   Banco de testes e experimentos
   Recados e orientações

   As informações das amostras são carregadas de:
   amostras/catalogo.json

   Caso o catálogo ainda não esteja publicado,
   serão utilizados os dados de dados.js.
   ============================================================ */

(() => {
  "use strict";

  const d = window.PORTFOLIO_DADOS;

  if (!d) {
    console.error(
      "PORTFOLIO_DADOS não encontrado. Verifique dados.js."
    );
    return;
  }

  // ==========================================================
  // 1. FUNÇÕES AUXILIARES
  // ==========================================================

  const $ = id => document.getElementById(id);

  const text = (el, valor) => {
    if (el) {
      el.textContent = String(valor ?? "");
    }
  };

  const safeLink = url => {
    try {
      const resultado = new URL(url);

      return ["https:", "http:"].includes(resultado.protocol)
        ? resultado.href
        : null;

    } catch {
      return null;
    }
  };

  const make = (tag, classe, conteudo) => {
    const elemento = document.createElement(tag);

    if (classe) {
      elemento.className = classe;
    }

    if (conteudo !== undefined) {
      elemento.textContent = conteudo;
    }

    return elemento;
  };

  const add = (pai, ...elementos) => {
    elementos.forEach(elemento => pai.append(elemento));
  };

  const buttonLink = (
    titulo,
    url,
    estilo = "btn"
  ) => {

    const linkSeguro = safeLink(url);

    if (!linkSeguro) {
      return make(
        "span",
        "hint",
        "Link ainda não cadastrado"
      );
    }

    const link = make("a", estilo, titulo);

    link.href = linkSeguro;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    return link;
  };

  const dateFmt = valor => {

    if (!valor) {
      return "Sem data";
    }

    const data = new Date(
      valor.length === 10
        ? valor + "T12:00:00"
        : valor
    );

    return Number.isNaN(data.getTime())
      ? valor
      : new Intl.DateTimeFormat(
          "pt-BR",
          {
            dateStyle: "medium",
            timeZone: "America/Sao_Paulo"
          }
        ).format(data);
  };

  function card(titulo, categoria, descricao) {

    const cartao = make("article", "card");

    add(
      cartao,
      make("span", "badge", categoria),
      make("h3", "", titulo),
      make("p", "", descricao)
    );

    return cartao;
  }

  // ==========================================================
  // 2. BIBLIOTECA DE CÓDIGOS
  // ==========================================================

  function renderCodes() {

    const root = $("lista-codigos");

    if (!root) return;

    root.replaceChildren();

    const codigos = d.codigos || [];

    if (!codigos.length) {

      root.append(
        make(
          "div",
          "empty",
          "Nenhum notebook cadastrado."
        )
      );

      return;
    }

    codigos.forEach(item => {

      const cartao = card(
        item.titulo,
        item.categoria,
        item.descricao
      );

      cartao.append(
        buttonLink(
          "Abrir no Colab ↗",
          item.url
        )
      );

      root.append(cartao);

    });
  }

  // ==========================================================
  // 3. BANCO DE AMOSTRAS — CATÁLOGO AUTOMÁTICO
  // ==========================================================

  async function renderSamples() {

    const root = $("lista-amostras");

    if (!root) return;

    root.replaceChildren();

    root.append(
      make(
        "div",
        "empty",
        "Carregando banco de amostras..."
      )
    );

    let classes = [];
    let catalogoAtual = null;

    // --------------------------------------------------------
    // 3.1. TENTAR LER O CATÁLOGO PUBLICADO
    // --------------------------------------------------------

    try {

      const resposta = await fetch(
        "amostras/catalogo.json?v=" + Date.now(),
        {
          cache: "no-store"
        }
      );

      if (!resposta.ok) {
        throw new Error(
          "Erro HTTP " + resposta.status
        );
      }

      const catalogo = await resposta.json();

      if (
        !Array.isArray(catalogo.classes) ||
        catalogo.classes.length === 0
      ) {
        throw new Error(
          "Catálogo sem classes cadastradas."
        );
      }

      // Validar os registros do catálogo.
      for (const item of catalogo.classes) {

        if (
          typeof item.nome !== "string" ||
          !item.nome.trim() ||
          !Number.isInteger(item.poligonos) ||
          item.poligonos < 0
        ) {
          throw new Error(
            "Catálogo possui dados de classe inválidos."
          );
        }

      }

      const totalCalculado = catalogo.classes.reduce(
        (soma, item) => soma + item.poligonos,
        0
      );

      if (
        catalogo.total_amostras !== undefined &&
        catalogo.total_amostras !== totalCalculado
      ) {
        throw new Error(
          "O total de amostras não corresponde " +
          "à soma das classes."
        );
      }

      classes = catalogo.classes;
      catalogoAtual = catalogo;

      console.log(
        "Catálogo de amostras carregado:",
        catalogo.extracao
      );

    } catch (erro) {

      console.warn(
        "Não foi possível carregar o catálogo:",
        erro
      );

      // Utilizar o cadastro anterior enquanto
      // o novo catálogo não estiver disponível.
      classes = d.classes || [];

    }

    // --------------------------------------------------------
    // 3.2. ATUALIZAR INDICADORES DO SITE
    // --------------------------------------------------------

    text(
      $("stat-classes"),
      classes.length
    );

    const todasContagensValidas = classes.every(
      item => Number.isInteger(item.poligonos)
    );

    const total = todasContagensValidas
      ? classes.reduce(
          (soma, item) => soma + item.poligonos,
          0
        )
      : null;

    text(
      $("stat-amostras"),
      total === null ? "—" : total
    );

    // --------------------------------------------------------
    // 3.3. ATUALIZAR DESCRIÇÃO DO BANCO
    // --------------------------------------------------------

    if (catalogoAtual) {

      const descricao = [
        "Banco de amostras da Area1.",
        "Extração: " + catalogoAtual.extracao + ".",
        "Total: " + total + " polígonos.",
        "Classes: " + classes.length + ".",
        "Arquivos GeoTIFF armazenados no Google Drive",
        "com acesso controlado."
      ].join(" ");

      text(
        $("amostras-descricao"),
        descricao
      );

    } else {

      text(
        $("amostras-descricao"),
        d.descricaoAmostras
      );

    }

    // --------------------------------------------------------
    // 3.4. GERAR OS CARTÕES AUTOMATICAMENTE
    // --------------------------------------------------------

    root.replaceChildren();

    if (!classes.length) {

      root.append(
        make(
          "div",
          "empty",
          "Nenhuma amostra cadastrada."
        )
      );

      return;
    }

    classes.forEach(item => {

      const cartao = make(
        "article",
        "card"
      );

      // Ícone da classe
      const nomeNormalizado = String(
        item.nome
      ).toLowerCase();

      let simbolo = item.icone || "◉";

      if (!item.icone) {

        if (
          nomeNormalizado.includes("arbórea") ||
          nomeNormalizado.includes("arborea")
        ) {
          simbolo = "🌳";
        }

      }

      const icone = make(
        "div",
        "class-icon",
        simbolo
      );

      // Nome da classe
      const titulo = make(
        "h3",
        "",
        item.nome
      );

      // Descrição da classe
      const descricao = make(
        "p",
        "",
        item.descricao ||
        "Amostras individuais extraídas da imagem Area1."
      );

      // Quantidade de polígonos
      const quantidade = make(
        "p",
        ""
      );

      const destaque = make(
        "strong",
        "",
        Number.isInteger(item.poligonos)
          ? item.poligonos + " polígonos"
          : "Quantidade a contabilizar"
      );

      quantidade.append(destaque);

      add(
        cartao,
        icone,
        titulo,
        descricao,
        quantidade
      );

      // ------------------------------------------------------
      // 3.5. LINK DIRETO PARA A PASTA DA CLASSE
      // ------------------------------------------------------

      if (item.link && safeLink(item.link)) {

        cartao.append(
          buttonLink(
            "Ver amostras da classe ↗",
            item.link,
            "btn outline"
          )
        );

      } else {

        cartao.append(
          make(
            "span",
            "hint",
            "Pasta ainda não vinculada."
          )
        );

      }

      root.append(cartao);

    });

  }

  // ==========================================================
  // 4. BANCO DE TESTES E EXPERIMENTOS
  // ==========================================================

  function renderExperiments() {

    const root = $("lista-experimentos");

    if (!root) return;

    root.replaceChildren();

    const experimentos = d.experimentos || [];

    if (!experimentos.length) {

      root.append(
        make(
          "div",
          "empty",
          "Nenhum experimento cadastrado."
        )
      );

      return;
    }

    experimentos.forEach(item => {

      const cartao = card(
        item.titulo,
        item.status || "Registrado",
        item.descricao
      );

      const metricas = make(
        "div",
        "pillrow"
      );

      (item.metricas || []).forEach(metrica => {

        metricas.append(
          make(
            "span",
            "pill",
            metrica
          )
        );

      });

      cartao.append(metricas);

      if (item.observacoes) {

        cartao.append(
          make(
            "p",
            "",
            item.observacoes
          )
        );

      }

      if (item.link) {

        cartao.append(
          buttonLink(
            "Ver resultados ↗",
            item.link,
            "btn outline"
          )
        );

      }

      root.append(cartao);

    });
  }

  // ==========================================================
  // 5. REPOSITÓRIO GITHUB
  // ==========================================================

  function repository() {

    const configuracao = d.repositorio || {};

    const owner = String(
      configuracao.usuario || ""
    ).trim();

    const repo = String(
      configuracao.nome || ""
    ).trim();

    if (
      !owner ||
      !repo ||
      owner.includes("SEU_USUARIO")
    ) {
      return null;
    }

    return {
      owner,
      repo,
      url:
        "https://github.com/" +
        encodeURIComponent(owner) +
        "/" +
        encodeURIComponent(repo)
    };
  }

  // ==========================================================
  // 6. RECADOS E ORIENTAÇÕES
  // ==========================================================

  async function diary() {

    const root = $("lista-diario");
    const newLink = $("novo-recado");

    if (!root || !newLink) return;

    const repositorio = repository();

    if (!repositorio) {

      root.replaceChildren();

      newLink.removeAttribute("href");

      newLink.setAttribute(
        "aria-disabled",
        "true"
      );

      return;
    }

    newLink.href =
      repositorio.url +
      "/issues/new?title=" +
      encodeURIComponent(
        "[Diário] Orientação do professor"
      ) +
      "&body=" +
      encodeURIComponent(
        "Data da orientação:\n\n" +
        "Recado / orientação:\n\n" +
        "Próximas atividades:\n"
      );

    const linkRepo = $("link-repo");

    if (linkRepo) {
      linkRepo.href = repositorio.url;
    }

    try {

      const endereco =
        "https://api.github.com/repos/" +
        encodeURIComponent(repositorio.owner) +
        "/" +
        encodeURIComponent(repositorio.repo) +
        "/issues?state=all&per_page=100" +
        "&sort=created&direction=desc";

      const resposta = await fetch(
        endereco,
        {
          headers: {
            Accept: "application/vnd.github+json"
          }
        }
      );

      if (!resposta.ok) {
        throw new Error(
          "HTTP " + resposta.status
        );
      }

      const todos = await resposta.json();

      const recados = todos.filter(
        item =>
          !item.pull_request &&
          /^\[Diário\]/i.test(item.title || "")
      ).slice(0, 20);

      root.replaceChildren();

      recados.forEach(item => {

        const cartao = make(
          "article",
          "diary-card"
        );

        add(
          cartao,

          make(
            "div",
            "date",
            dateFmt(item.created_at)
          ),

          make(
            "h3",
            "",
            item.title.replace(
              /^\[Diário\]\s*/i,
              ""
            )
          ),

          make(
            "small",
            "",
            "Registrado por @" +
            (item.user?.login || "usuário") +
            " · " +
            (
              item.state === "closed"
                ? "Concluído"
                : "Em aberto"
            )
          ),

          make(
            "p",
            "",
            item.body || "Sem texto adicional."
          ),

          buttonLink(
            "Abrir registro e comentários ↗",
            item.html_url,
            "btn outline"
          )
        );

        root.append(cartao);

      });

    } catch (erro) {

      console.warn(
        "Erro ao carregar recados:",
        erro
      );

      root.replaceChildren();

    }

  }

  // ==========================================================
  // 7. INICIALIZAÇÃO DO SITE
  // ==========================================================

  function init() {

    // Cores
    document.documentElement.style.setProperty(
      "--accent",
      d.tema.acento
    );

    document.documentElement.style.setProperty(
      "--accent-soft",
      d.tema.suave
    );

    document.documentElement.style.setProperty(
      "--hero",
      d.tema.escuro
    );

    document.documentElement.style.setProperty(
      "--hero2",
      d.tema.degrade
    );

    // Informações gerais
    document.title = d.nome + " | CBERS-4A";

    text($("marca"), d.nome);
    text($("titulo"), d.titulo);
    text($("subtitulo"), d.subtitulo);

    text(
      $("autoria"),
      d.autora + " · " + d.tipo
    );

    text(
      $("rodape"),
      d.nome + " · " + d.autora
    );

    // Estatísticas gerais
    text(
      $("stat-codigos"),
      (d.codigos || []).length
    );

    text(
      $("stat-exps"),
      (d.experimentos || []).length
    );

    // Valores provisórios até carregar o JSON
    text(
      $("stat-classes"),
      (d.classes || []).length
    );

    // Renderizar componentes
    renderCodes();

    // Esta função busca o catálogo JSON e
    // atualiza as quantidades automaticamente.
    renderSamples();

    renderExperiments();

    diary();

  }

  // ==========================================================
  // 8. EXECUTAR QUANDO A PÁGINA ESTIVER PRONTA
  // ==========================================================

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      init
    );

  } else {

    init();

  }

})();
