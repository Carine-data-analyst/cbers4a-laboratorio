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
      "titulo": "Visualização da Area1 em falsa-cor NIR para o CVAT",
      "categoria": "Pré-processamento",
      "descricao": "Composição falsa-cor NIR–Vermelho–Verde (bandas 4–3–2), realce radiométrico e exportação PNG sem alterar dimensões ou posições dos pixels.",
      "url": "https://colab.research.google.com/github/Carine-data-analyst/cbers4a-laboratorio/blob/main/notebooks/visualizacao_falsa_cor_nir_area1.ipynb"
    },
    {
      "titulo": "Conversão de XML para Shapefile e Categorização de Classes + Extração Individual dos Polígonos em GeoTIFF ",
      "categoria": "Amostragem / CVAT",
      "descricao": "Conversão das anotações em geometrias e separação das classes em pastas e arquivos individuais.",
      "url": "https://colab.research.google.com/drive/1095adNgsNkqJaE83r53PWkD3Ry8honwG"
    },
    {
      "titulo": "Experimento piloto 1: recortes e contexto com patches 64x64",
      "categoria": "MobileNetV2 / testes",
      "descricao": "Comparações iniciais de recorte ajustado e contexto espacial e preparação de amostras.",
      "url": "https://colab.research.google.com/drive/1bcTsx5zZcnOAi5sT8ux33f0cJnUCszHd"
    },   
    {
      "titulo": "Treinamento MobileNetV2 - contorno sem contexto",
      "categoria": "MobileNetV2 / treinamento",
      "descricao": "Treinamento da MobileNetV2 utilizando os GeoTIFFs individuais dos polígonos, sem contexto espacial adicional. Identificação automática de classes, labels e quantidade de amostras.",
      "url": "https://colab.research.google.com/drive/1jAKTmaX2Fdv1kN7BMS81icjiQ6_oP4k8#scrollTo=W8k3aEjb_e85"
    },
    {
      "titulo": "Treinamento MobileNetV2 - contorno com contexto buffer",
      "categoria": "MobileNetV2 / treinamento",
    "descricao": "Treinamento da MobileNetV2 utilizando os polígonos com contexto espacial adicional por buffer de 20%. Identificação automática de classes, labels e quantidade de amostras.",
    "url": "https://colab.research.google.com/drive/1aoGIhadt1MUrmyAeowUtEcgryCu4GC8n#scrollTo=5kVP9NMeVnR-"
    }
  ],
  "experimentos": [
    {
      "titulo": "Experimento piloto 2: MobileNetV2 — 110 polígonos e três recortes",
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
    },    
    {
      "titulo": "Treinamento 1 — MobileNetV2: contorno sem contexto",
      "status": "Concluído",
      "descricao": "Estratégia: SEM CONTEXTO. Total de amostras: 500. Classes: 2. Treinamento: 350. Validação: 75. Teste: 75. Acurácia de teste: 96,00%.",
      "metricas": [
        "500 amostras",
        "2 classes",
        "350 treino",
        "75 validação",
        "75 teste",
        "Acurácia: 96,00%"
      ],
      "observacoes": "Experimento com amostras próprias da Area1, sem contexto buffer. Resultado referente à execução de 500 amostras; novas execuções do notebook podem substituir as saídas apresentadas no link.",
      "link": "https://colab.research.google.com/drive/1BiLmwB0QBfh5zVqiVDKiQ9MWiScDNbTc#scrollTo=W8k3aEjb_e85&fullscreenOutput=true"
    },
    {
      "titulo": "Treinamento 1 — MobileNetV2: contorno com contexto buffer",
      "status": "Concluído",
      "descricao": "Estratégia: COM CONTEXTO BUFFER DE 20%. Total de amostras: 500. Classes: 2. Treinamento: 350. Validação: 75. Teste: 75. Acurácia de teste: 90,67%.",
      "metricas": [
        "500 amostras",
        "2 classes",
        "350 treino",
        "75 validação",
        "75 teste",
        "Buffer: 20%",
        "Acurácia: 90,67%"
      ],
      "observacoes": "Experimento com amostras próprias da Area1, utilizando contexto buffer de 20%. Resultado referente à execução de 500 amostras; novas execuções do notebook podem substituir as saídas apresentadas no link.",
      "link": "https://colab.research.google.com/drive/1VJeWbnCP6Y1fbXTvH2l60Oqz5ejXkq1d#scrollTo=5kVP9NMeVnR-&fullscreenOutput=true"
    },
  ],
  "historico": [
    {
      "data": "2026-11-10",
      "titulo": "Visualização falsa-cor NIR adicionada",
      "descricao": "Notebook de exportação PNG em falsa-cor para anotação no CVAT, mantendo as dimensões da Area1."
    }
  ]
};
