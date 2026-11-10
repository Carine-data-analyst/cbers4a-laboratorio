# Atualização incremental do site da Carine — Catálogos de amostras e testes

## Preservação do site

A atualização foi baseada no `index.html`, `dados.js` e `app.js` existentes no repositório em 10/11/2026. **Não substitua `dados.js`, `app.js`, `styles.css` ou a pasta `notebooks`**. Seu diário via GitHub Issues continuará funcionando.

## Instalação

1. Antes de alterar, baixe um ZIP de backup do repositório no botão `Code > Download ZIP`.
2. Extraia este pacote.
3. No repositório GitHub, substitua **somente** `index.html` pelo novo arquivo.
4. Envie `catalogos.js` e `catalogos.css` para a raiz.
5. Envie as pastas `amostras`, `testes`, `historico` e `arquivos_gerados`, mantendo os caminhos internos. Faça commit na branch `main`.
6. Confira o site. A biblioteca de códigos e os experimentos históricos continuarão aparecendo; novas seções 'Galeria de amostras' e 'Testes publicados' surgirão abaixo.

### Como cadastrar novo teste sem modificar o HTML

Cada teste fica em `testes/<identificador>/`, por exemplo `testes/experimento_003/`. Inclua seus CSVs/PNGs, `resumo.json` e adicione um item em `testes/catalogo.json`.

Exemplo de item:

```json
{
  "id": "experimento_003",
  "titulo": "MobileNetV2 - experimento 003",
  "descricao": "Comparação de recortes",
  "status": "Concluído",
  "data": "2026-11-10",
  "total_amostras": 200,
  "acuracia_teste": null,
  "pagina": "testes/experimento_003/resumo.json"
}
```

**Não use este exemplo de 200 amostras como resultado real**: é somente o formato. A acurácia é fração entre 0 e 1. As métricas reais devem vir do experimento.

### Como cadastrar uma amostra

Adicione uma imagem PNG de prévia a `amostras/vegetacao_arborea/` ou `amostras/outros/` e um objeto no array `amostras` de `amostras/catalogo.json`:

```json
{"id":"amostra_001","classe":"Vegetação arbórea","imagem_origem":"Area1.tif","conjunto":"treino","descricao":"Recorte anotado","previa":"amostras/vegetacao_arborea/amostra_001.png","arquivo":""}
```

Não publique GeoTIFFs completos e outros arquivos extensos ou dados sensíveis sem revisão.

### Publicação a partir do Colab

O notebook `publicar_resultados_colab.ipynb` oferece um fluxo manual seguro: no fim de um experimento, aponta a pasta de resultados já salva no Drive, copia somente PNG/CSV/JSON/MD permitidos ao repositório, cria/atualiza `resumo.json` e o catálogo JSON. Um segredo `GITHUB_TOKEN` no Colab é necessário para publicação direta e deve ter acesso de escrita somente a este repositório.

Este processo **não é agendado**: executar a célula de publicação é o gatilho da atualização. Inicialmente o notebook opera com `PUBLICAR = False` (prévia); altere para True para confirmar após revisar os arquivos. Se preferir, a mesma pasta pode ser enviada manualmente pelo navegador.

## Dados científicos

Mantenha IDs estáveis, versione datasets, indique a origem da imagem, divisão treino/validação/teste, métricas e eventuais riscos de autocorrelação espacial. Nunca misture resultados de execuções distintas em um mesmo identificador.

## Publicar amostras via Colab

O notebook `publicar_amostras_colab.ipynb` pode enviar **PNGs de prévias de polígonos já classificados**, separados por classe, ao GitHub e atualizar `amostras/catalogo.json`. Não use pastas de patches mistos para publicar como se fossem polígonos individuais. A primeira execução é apenas prévia (`PUBLICAR=False`). Não calcula automaticamente contagens de polígonos — confirme as contagens a partir do XML/Shapefile, e publique-as manualmente em `contagens_por_classe`.
