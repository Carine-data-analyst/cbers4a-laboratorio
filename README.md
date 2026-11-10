# Portfólio acadêmico CBERS-4A — Carine

Este site é um conjunto de arquivos estáticos (HTML, CSS e JavaScript), destinado a **GitHub Pages**.

## Instalação

1. Crie ou abra um repositório **público** do GitHub. Para Carine, o repositório previsto é `cbers4a-laboratorio`.
2. Extraia este ZIP **no computador**. Envie `index.html`, `styles.css`, `app.js`, `dados.js`, `README.md` e `.nojekyll` **para a raiz do repositório**, não para dentro de uma subpasta.
3. No GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**.
4. Na aba **Settings → General → Features**, confirme que **Issues** está ativado (isso habilita o diário).
5. Espere a publicação do GitHub Pages e abra a URL indicada em Settings → Pages.

## Como editar sem mexer no design

Abra `dados.js` no GitHub e clique no lápis de edição. Altere somente as informações dos objetos de dados:

- `codigos`: título, categoria, descrição, URL do Colab. Para abrir os notebooks, o compartilhamento do Colab precisa permitir que o professor visualize.
- `classes`: nome, descrição, quantidade de **polígonos** (`poligonos`) e link opcional para os arquivos. `null` representa quantidade ainda não verificada.
- `experimentos`: título, resumo, métricas, observações e link opcional de resultados.
- `historico`: data no formato `AAAA-MM-DD`, título e descrição; acrescente um novo objeto a cada atualização.

O arquivo `dados.js` já contém exemplos ou espaços vazios para cada seção. Para ver a sintaxe, basta abrir esse arquivo.

**Não publique tokens, credenciais ou dados privados nos arquivos do site.** O repositório e os recados do professor ficarão públicos.

## Diário do professor

No site, a opção **Deixar recado** abre a tela de criação de uma GitHub Issue. O professor precisa **entrar em sua conta GitHub** para registrar a anotação. O título começa com `[Diário]`, e esse marcador é necessário para que o recado apareça na página.

O registro é salvo no próprio GitHub, com data, autor e discussão. O site carrega automaticamente até 20 recados mais recentes entre as 100 Issues mais recentes do repositório, por meio da API pública. Podem existir limites temporários da API ou atraso na atualização. O professor pode abrir o registro para acrescentar comentários; esses comentários permanecem no GitHub (não são espelhados integralmente na página).

Se a página não mostrar os recados, confira se o repositório é público, as Issues estão habilitadas e o título começa com `[Diário]`.

O usuário GitHub e o nome do repositório já estão configurados.

## Publicação dos resultados do Colab

Os dados pesados (GeoTIFF, shapefiles completos e conjuntos integrais de amostras) permanecem no Google Drive. Para o site, publique apenas CSVs resumidos, gráficos PNG, miniaturas de amostras e links explicitamente compartilhados.

**Ainda não existe sincronização automática Colab → GitHub neste pacote.** Essa será uma etapa separada, com autenticação segura (por exemplo, secrets do Colab ou GitHub Actions); jamais coloque tokens no `dados.js`.

O GitHub Pages não executa Python nem fornece um banco de dados de escrita. Por isso o diário usa GitHub Issues, e o restante das seções é atualizado por commits no repositório.
