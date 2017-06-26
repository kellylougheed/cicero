window.onload = function() {

  var button = document.getElementById("go");
  var inputBox = document.getElementById("box");
  var p1 = document.getElementById("def");
  var p2 = document.getElementById("etc");

  button.addEventListener("click", function() {
    var word = inputBox.value;
    chrome.extension.sendMessage({word: word}, function(response) {
      console.log(response);
      p1.innerText = response.p1;
      p2.innerHTML = response.p2;
    })
  });

}
