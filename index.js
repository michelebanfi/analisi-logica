function downloadImage() {
  html2canvas(document.getElementById("defaultCanvas0")).then((canvas) => {
    var a = document.createElement("a");
    a.href = canvas
      .toDataURL("image/jpeg")
      .replace("image/jpeg", "image/octet-stream");
    a.download = "image.jpg";
    a.click();
  });
}
//--------------------------------------------
window.addEventListener(
  "contextmenu",
  function (e) {
    e.preventDefault();
  },
  false
);

let menu = {
  coo: [],
  visible: false,
  status: 0,
};
let data = [];
let buttonVerbo,
  buttonNome,
  buttonPredicato,
  buttonAggettivo,
  close,
  link,
  unLink,
  nuke;
let textInput, inputValue;

/*
  verbo: 0,
  nome: 1,
  predicato: 2,
  aggettivo: 3
*/
function setup() {
  createCanvas(1500, 800);
}
function myInputEvent() {
  inputValue = this.value();
}
function menuDrawer() {
  if (menu.coo[0] !== undefined) {
    menu.status = 1;
    textInput = createInput("");
    textInput.position(mouseX, mouseY);
    textInput.input(myInputEvent);
    buttonVerbo = createButton("Close");
    buttonVerbo.position(menu.coo[0] - 100, menu.coo[1] - 42);
    buttonVerbo.mousePressed(() => removeElements());
    buttonVerbo = createButton("Verbo");
    buttonVerbo.position(menu.coo[0] - 100, menu.coo[1] - 21);
    buttonVerbo.mousePressed(() =>
      addElement(0, [menu.coo[0], menu.coo[1]], inputValue)
    );
    buttonNome = createButton("Nome");
    buttonNome.position(menu.coo[0] - 100, menu.coo[1]);
    buttonNome.mousePressed(() =>
      addElement(1, [menu.coo[0], menu.coo[1]], inputValue)
    );
    buttonPredicato = createButton("Predicato");
    buttonPredicato.position(menu.coo[0] - 100, menu.coo[1] + 21);
    buttonPredicato.mousePressed(() =>
      addElement(2, [menu.coo[0], menu.coo[1]], inputValue)
    );
    buttonAggettivo = createButton("Aggettivo");
    buttonAggettivo.position(menu.coo[0] - 100, menu.coo[1] + 42);
    buttonAggettivo.mousePressed(() =>
      addElement(3, [menu.coo[0], menu.coo[1]], inputValue)
    );
    link = createButton("Link");
    link.position(menu.coo[0] - 100, menu.coo[1] + 63);
    link.mousePressed(() => {
      addLink(-1);
    });
    unLink = createButton("UndLink");
    unLink.position(menu.coo[0] - 100, menu.coo[1] + 84);
    unLink.mousePressed(() => {
      addLink(-2);
    });
    nuke = createButton("Nuke");
    nuke.position(menu.coo[0] + 100, menu.coo[1] - 42);
    nuke.mousePressed(() => {
      addNuke();
    });
  }
}
function addNuke() {
  let array = [];
  let min = [1000000, 100000]; // [minX, minY]
  let max = [0, 0]; // [maxX, maxY]
  data.map((item, i) => {
    if (item.selected && item.type > -1) {
      if (item.coo[0] < min[0]) {
        min[0] = item.coo[0];
      }
      if (item.coo[0] > max[0]) {
        max[0] = item.coo[0];
      }
      if (item.coo[1] < min[1]) {
        min[1] = item.coo[1];
      }
      if (item.coo[1] > max[1]) {
        max[1] = item.coo[1];
      }
      array.push(i);
    }
  });
  //console.log(min, max);
  data.unshift({
    type: -3,
    coo: [
      min[0] + (max[0] - min[0]) / 2,
      min[1] + (max[1] - min[1]) / 2,
      max[0] - min[0],
      max[1] - min[1],
    ],
  });
}
function addLink(type) {
  let array = [];
  data.map((item, i) => {
    if (item.selected) {
      array.push(i);
    }
  });
  if (array.length !== 2) {
    console.log("error");
  } else {
    if (type === -1) {
      data.unshift({
        type: -1,
        coo: [
          data[array[0]].coo[0],
          data[array[0]].coo[1],
          data[array[1]].coo[0],
          data[array[1]].coo[1],
        ],
      });
    } else if (type === -2) {
      data.unshift({
        type: -2,
        coo: [
          data[array[0]].coo[0],
          data[array[0]].coo[1],
          data[array[1]].coo[0],
          data[array[1]].coo[1],
          //ball position
          data[array[0]].coo[0] +
            (data[array[1]].coo[0] - data[array[0]].coo[0]) / 2,
          data[array[1]].coo[1] +
            (data[array[0]].coo[1] - data[array[1]].coo[1]) / 2,
        ],
      });
    }
  }
}
function draw() {
  background("#333");
  drawItems();

  if (menu.visible && menu.status === 0) {
    //menuDrawer();
  }

  if (mouseIsPressed && mouseButton === RIGHT) {
    //menu selection
    removeElements();
    menuDrawer();
    menu.coo = [mouseX, mouseY];
    menu.visible = true;
  }
}

function mouseClicked() {
  //selection
  if (!keyIsDown(16)) {
    data.map((item) => {
      item.selected = false;
    });
  }
  data.map((item) => {
    if (
      mouseX > item.coo[0] - 50 &&
      mouseX < item.coo[0] + 50 &&
      mouseY > item.coo[1] - 15 &&
      mouseY < item.coo[1] + 15
    ) {
      item.selected = true ? !item.selected : true;
    }
  });
}

function addElement(item, coo, title) {
  if (title !== undefined && title !== "") {
    data.push({ type: item, coo: coo, title: title, selected: false });
  }
  inputValue = "";
}

function drawItems() {
  data.map((item) => {
    if (item.type === -1) {
      stroke("white");
      line(item.coo[0], item.coo[1], item.coo[2], item.coo[3]);
    } else if (item.type === -2) {
      stroke("white");
      line(item.coo[0], item.coo[1], item.coo[2], item.coo[3]);
      ellipse(item.coo[4], item.coo[5], 10, 10);
    } else if (item.type === -3) {
      noFill();
      stroke("white");
      ellipse(item.coo[0], item.coo[1], item.coo[2] + 200, item.coo[3] + 120);
    } else {
      noStroke();
      if (item.selected) {
        fill("blue");
      } else {
        fill("white");
      }
      ellipse(item.coo[0], item.coo[1], 100, 30);
      fill("black");
      text(item.title, item.coo[0], item.coo[1]);
    }
  });
}
