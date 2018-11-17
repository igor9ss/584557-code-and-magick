'use strict';
var CLOUD_X_COORD = 100;
var CLOUD_Y_COORD = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_COLOR = '#ffffff';

var SHADOW_OFFSET = 10;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

var HEADER_TEXT = ['Ура вы победили!', 'Список результатов:'];
var HEADER_TEXT_X_COORD = 130;
var HEADER_TEXT_Y_COORD = 40;
var HEADER_TEXT_GAP = 20;

var TEXT_STYLE = '16px "PT Mono"';
var TEXT_COCLOR = '#000000';
var TEXT_GAP = 5;

var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var BAR_GAP = 50;
var INITIAL_BAR_Y_COORD = 100;
var USER_BAR_COLOR = 'rgba(255, 0, 0, 1)';

window.renderStatistics = function (ctx, names, times) {
  var MAX_TIME = getMaxElement(times);

  drawStaticStatsContent(ctx);

  for (var i = 0; i < names.length; i++) {
    var BAR_HEIGHT = MAX_BAR_HEIGHT / MAX_TIME * times[i];
    var BAR_X_COORD = CLOUD_X_COORD + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var BAR_Y_COORD = INITIAL_BAR_Y_COORD + (MAX_BAR_HEIGHT - BAR_HEIGHT);

    ctx.fillStyle = names[i] === 'Вы' ? USER_BAR_COLOR : getPlayerBarColor();

    ctx.fillRect(BAR_X_COORD, BAR_Y_COORD, BAR_WIDTH, BAR_HEIGHT);

    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], BAR_X_COORD, BAR_Y_COORD - TEXT_GAP);
    ctx.fillText(Math.floor(times[i]), BAR_X_COORD, 265);
  }
};

function drawStaticStatsContent(ctx) {
  drawStatsCloudShadow(ctx);
  drawStatsCloud(ctx);
  drawStatsHeaderText(ctx);
}

function drawStatsCloudShadow(ctx) {
  ctx.fillStyle = SHADOW_COLOR;
  ctx.fillRect(CLOUD_X_COORD + SHADOW_OFFSET, CLOUD_Y_COORD + SHADOW_OFFSET, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function drawStatsCloud(ctx) {
  ctx.fillStyle = CLOUD_COLOR;
  ctx.fillRect(CLOUD_X_COORD, CLOUD_Y_COORD, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.strokeStyle = '#34de6b';
  ctx.strokeRect(CLOUD_X_COORD, CLOUD_Y_COORD, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function drawStatsHeaderText(ctx) {
  ctx.fillStyle = TEXT_COCLOR;
  ctx.font = TEXT_STYLE;

  for (var i = 0; i < HEADER_TEXT.length; i++) {
    ctx.fillText(HEADER_TEXT[i], HEADER_TEXT_X_COORD, HEADER_TEXT_Y_COORD + HEADER_TEXT_GAP * i);
  }
}

function getPlayerBarColor() {
  return 'rgb(0, 0, ' + getRandomInteger(0, 255) + ')';
}

function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function getMaxElement(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}
