// Suggestion of solution to the challenge available at
// https://thecodingtrain.com/CodingChallenges/068.2-bfs-kevin-bacon.html

let data;
let nodes = [];
let hash = {};

function preload() {
  data = loadJSON('kevinbacon.json');
}

function setup() {
  dropdown = createSelect();
  dropdown.changed(bfs);
  noCanvas();

  const { movies } = data;


  movies.forEach(movie => {

    let movie_obj = new Node(movie.title);

    nodes.push(movie_obj);
    hash[movie.title] = movie_obj;

    movie.cast.forEach(actor => {
      let actor_obj = hash[actor] || new Node(actor);

      if (!hash[actor]) {
        hash[actor] = actor_obj;
        nodes.push(actor_obj);
        dropdown.option(actor);
      }
      movie_obj.addEdge(actor_obj);
    })
  })
}

class Node {
  constructor(name) {
    this.name = name;
    this.edges = [];
    this.searched = false;
    this.parent = null;
  }
  addEdge = function (neighbor) {
    this.edges.push(neighbor);
    neighbor.edges.push(this);
  }
  reset = function () {
    this.searched = false;
    this.parent = null;
  }
}

function bfs() {
  nodes.forEach(node => node.reset())

  let queue = [];
  const start = hash[dropdown.value()];
  const end = hash['Kevin Bacon'];

  start.searched = true;
  queue.push(start);

  while (queue.length > 0) {
    let current = queue.shift();

    if (current.name == end.name) {
      break;
    }
    current.edges.forEach(neighbor => {
      if (!neighbor.searched) {
        neighbor.searched = true;
        neighbor.parent = current;
        queue.push(neighbor);
      }
    })
  }
  let current = end;
  let path = [];
  while (current.parent) {
    path.push(current.name);
    current = current.parent;
  }
  path.push(start.name);
  createP(path.reverse().join(" => "));

}