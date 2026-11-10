/* Edite apenas os dados abaixo. Mantenha window.PORTFOLIO_DADOS. */
window.PORTFOLIO_DADOS = {
  "nome": "Laboratório CBERS-4A | Carine",
  "titulo": "Classificação da vegetação arbórea com imagens CBERS-4A",
  "subtitulo": "Portfólio de pesquisa: biblioteca de códigos, banco de amostras em duas classes, experimentos com MobileNetV2 e diário de orientação.",
  "autora": "Carine",
  "tipo": "Classificação binária · 2 classes",
  "descricaoAmostras": "Conjunto binário de anotações da Area1: vegetação arbórea e outros elementos de cobertura urbana. Os totais atuais serão preenchidos após conferência das versões do CVAT.",
  "tema": {
    "acento": "#147d7a",
    "suave": "#e1f4f0",
    "escuro": "#102d3b",
    "degrade": "#235965"
  },
  "repositorio": {
    "usuario": "Carine-data-analyst",
    "nome": "cbers4a-laboratorio"
  },
  "classes": [
    {
      "nome": "Vegetação arbórea",
      "icone": "🌳",
      "descricao": "Copas de árvores e vegetação de porte arbóreo.",
      "poligonos": null,
      "link": ""
    },
    {
      "nome": "Outros",
      "icone": "◫",
      "descricao": "Demais elementos e coberturas do solo reunidos em uma classe.",
      "poligonos": null,
      "link": ""
    }
  ],
  "codigos": [
    {
      "titulo": "Caracterização da Area1 e geração de patches",
      "categoria": "Pré-processamento",
      "descricao": "Leitura de bandas, resolução espacial, NoData, extração de patches e tabelas de controle.",
      "url": "https://colab.research.google.com/drive/1jbvqGwb2aetUKyyFLCqEF0rrngTFHf3b"
    },
    {
      "titulo": "Extração de amostras da Area1",
      "categoria": "Amostragem / CVAT",
      "descricao": "Conversão das anotações em geometrias e extração de amostras; conferir a versão antes de executar.",
      "url": "https://colab.research.google.com/drive/1095adNgsNkqJaE83r53PWkD3Ry8honwG"
    },
    {
      "titulo": "Experimento piloto: recortes e contexto",
      "categoria": "MobileNetV2 / testes",
      "descricao": "Comparações iniciais de recorte ajustado e contexto espacial e preparação de amostras.",
      "url": "https://colab.research.google.com/drive/1bcTsx5zZcnOAi5sT8ux33f0cJnUCszHd"
    }
  ],
  "experimentos": [
    {
      "titulo": "MobileNetV2 — 110 polígonos e três recortes",
      "status": "Resultado histórico",
      "descricao": "Comparação entre recortes ajustados, contexto retangular e buffer. Foram 110 polígonos originais e 330 recortes.",
      "metricas": [
        "77 treino",
        "16 validação",
        "17 teste",
        "100% no teste para as 3 estratégias"
      ],
      "observacoes": "Resultado limitado a 17 amostras de teste da mesma imagem. Não demonstra generalização espacial; registrar a versão do dataset.",
      "link": ""
    },
    {
      "titulo": "MobileNetV2 — piloto de 33 polígonos",
      "status": "Resultado histórico",
      "descricao": "Treinamento preliminar comparando recorte ajustado com contexto.",
      "metricas": [
        "20 treino",
        "6 validação",
        "7 teste"
      ],
      "observacoes": "Resultados de piloto e variantes de execução devem ser versionados individualmente antes da comparação.",
      "link": ""
    }
  ],
  "historico": []
};
