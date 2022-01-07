//Conversor de moedas

function tempconver(moeda, moeda1, moeda2) {
  if (moeda1 === "JPY") {
    var url =
      "https://economia.awesomeapi.com.br/last/" +
      moeda1 +
      "-" +
      moeda2 +
      ",BTC-" +
      moeda2;
  } else {
    var url =
      "https://economia.awesomeapi.com.br/last/" +
      moeda1 +
      "-" +
      moeda2 +
      ",BTC-" +
      moeda1;
  }
  let request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onload = function () {
    if (request.readyState == 4 && request.status == 200) {
      var resposta = JSON.parse(request.responseText);
      var convValor = resposta[moeda1 + moeda2].ask;
      var conv = parseFloat(moeda) * parseFloat(convValor);
      document.getElementById("conve").innerHTML =
        '<p class="azul">Valor convertido de ' +
        moeda +
        " " +
        moeda1 +
        " para " +
        conv.toFixed(2) +
        " " +
        moeda2 +
        " .</p>";
      //Calcula o valor em bitcoin para a moeda que vai ser convertida
      if (moeda1 === "JPY") {
        var convValorBitcoin = resposta["BTC" + moeda2].ask;
        var convBitcoin = parseFloat(conv) / parseFloat(convValorBitcoin);
      } else {
        var convValorBitcoin = resposta["BTC" + moeda1].ask;
        var convBitcoin = parseFloat(moeda) / parseFloat(convValorBitcoin);
      }

      document.getElementById("bitcoin").innerHTML =
        "Valor em bitcoins: " + convBitcoin.toFixed(5) + " BTC.";
    }
  };
  request.onerror = function () {
    console.log("Erro:" + request);
  };
  request.send();
  //Verifica quais sao as opcoes seleciondas na tela pelo usuario e faz o calculo necessario para a conversao das moedas selecionadas
  if (moeda1 === moeda2) {
    var conv = parseFloat(moeda);
    document.getElementById("conve").innerHTML =
      '<p class="vermelho">Selecione moedas diferentes para fazer a conversão.</p>';
    document.getElementById("bitcoin").innerHTML = " ";
  }
}
