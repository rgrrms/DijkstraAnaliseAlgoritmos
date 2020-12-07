const dijkstra = (grafo) => {
  console.log("***********************************************************************************");
  console.log("***********************************************************************************");
  console.log("*************************************Dijkstra:*************************************");
  console.log("***********************************************************************************");
  console.log("***********************************************************************************");
  console.log('[GRAFO]', grafo);

  console.time('time');
  const valoresDescobertos = Object.assign({finish: Infinity}, grafo.start);
  console.log('[VALORES_CONHECIDOS]',valoresDescobertos);

  const paisDescobertos = {finish: null};
  for (let filho in grafo.start) {
    paisDescobertos[filho] = 'start';
  }
  console.log('[INICIADOS]',paisDescobertos);

  const verticesProcessados = [];

  let vertice = menorValor(valoresDescobertos, verticesProcessados);
  console.log('[VERTICE_INICIADO]', vertice)

  while (vertice) {
    console.log('[VERTICE ATUAL]',vertice)
    let valorVertice = valoresDescobertos[vertice];
    let filhoDoVertice = grafo[vertice];

    for (let filho in filhoDoVertice) {
      let valorDoVertice = filhoDoVertice[filho]
      let valorParaFilho = valorVertice + valorDoVertice;

      if (!valoresDescobertos[filho] || valoresDescobertos[filho] > valorParaFilho) {
        valoresDescobertos[filho] = valorParaFilho;
        paisDescobertos[filho] = vertice;
      }

      console.log('[VALORES_DESCOBERTOS]', valoresDescobertos)
      console.log('[PAIS_DESCOBERTOS]', paisDescobertos)
      console.log("***********************************************************************************");
    }

    verticesProcessados.push(vertice);

    vertice = menorValor(valoresDescobertos, verticesProcessados);
  }

  let caminho = ['finish'];
  let pais = paisDescobertos.finish;
  while (pais) {
    caminho.push(pais);
    pais = paisDescobertos[pais];
  }
  caminho.reverse();

  const resultado = {
    ValorTotal: valoresDescobertos.finish,
    Caminho: caminho
  };

  console.timeEnd('time');
  return resultado;
};

const menorValor = (valor, descobertos) => {
  const conhecidos = Object.keys(valor)

  const menorValorEncontrado = conhecidos.reduce((menor, vertice) => {
    if ((menor === null || valor[vertice] < valor[menor]) && !descobertos.includes(vertice)) {
      menor = vertice;
    }
    return menor;
  }, null);

  return menorValorEncontrado
};

const grafo = {
  start: {A: 50, B: 80, C: 90},
  A: {C: 20, E: 40},
  B: {D: 10},
  C: {D: 20, E: 10, F: 20},
  D: {G: 30},
  E: {finish: 40},
  F: {E:10, G:20, finish: 20},
  G: {finish: 30},
  finish: {}
};


console.log('[DIJKSTRA]', dijkstra(grafo));
  