// Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

// moverBolinha
let xVelocidade = 6;
let yVelocidade = 6;

// Barra
let xBarra = 5;
let yBarra = 150;
let wBarra = 8;
let hBarra = 90;

// lIBRIES

let colidiu = false;

// Barra Oponente

let xRaqueteOponente = 585;
let yRaqueteOponente = 150;

let velocidadeOponenteY;

// Placar do jogo

let meusPontos = 0;
let pontosOponente = 0;

// Efeitos sonotos

let ponto;
let raquetada;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  bolinha();
  moverBolinha();
  colisao();
  minhaBarr(xBarra, yBarra);
  minhaBarr(xRaqueteOponente, yRaqueteOponente);
  moverBarra();
  colisaoBarra(xBarra, yBarra);
  colisaoBarra(xRaqueteOponente, yRaqueteOponente);
  movimentaOponente();
  mostraPlacar();
  marcaPontos();
}

function bolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function moverBolinha() {
  xBolinha += xVelocidade;
  yBolinha += yVelocidade;
}

function colisao() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    xVelocidade *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    yVelocidade *= -1;
  }
}

function minhaBarr(x, y) {
  rect(x, y, wBarra, hBarra);
}

function moverBarra() {
  if (keyIsDown(UP_ARROW)) {
    yBarra += -10;
  } else if (keyIsDown(DOWN_ARROW)) {
    yBarra += 10;
  }
}

function colisaoBarra(x, y) {
  colidiu = collideRectCircle(x, y, wBarra, hBarra, xBolinha, yBolinha, raio);
  if (colidiu) {
    xVelocidade *= -1;
    raquetada.play();
  }
}

function movimentaOponente() {
  velocidadeOponenteY = yBolinha - yRaqueteOponente - wBarra / 2 - 85;
  yRaqueteOponente += velocidadeOponenteY;
}

function mostraPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(255, 140, 0);
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(255, 140, 0);
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPontos() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosOponente += 1;
    ponto.play();
  }
}
