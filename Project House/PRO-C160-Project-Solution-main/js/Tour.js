AFRAME.registerComponent("tour", {
  schema: {
    state: { type: "string", default: "places-list" },
    selectedPlace: { type: "string", default: "#card1" },
    zoomAspectRatio: { type: "number", default: 1 }
  },
  init: function() {
    this.placesContainer = this.el;
    this.cameraEl = document.querySelector("#camera");
    this.createPlace();
  },
  tick: function() {
    const { state } = this.el.getAttribute("tour");

    if (state === "view") {
      this.hideEl([this.placesContainer]);
      this.showView();
    }
  },
  hideEl: function(elList) {
    elList.map(el => {
      el.setAttribute("visible", false);
    });
  },
  createPlace: function() {
    const details = {
      garden: {
        position: { x: -30, y: 5, z: 5 },
        rotation: { x: 0, y: -270, z: 0 },
        rotation1:{x: 0, y: -270, z: 0},
        position1: { x: -30, y: 5, z: 5 },
        src: "./assets/360_images/place-garden.jpg",
        geometry:{primitive: "ring", radiusInner: 4, radiusOuter: 5},
        title: "Workout Room",
        id: "garden"
      },
      main_gate: {
        position: {x: 20, y: -4.5, z: 30 },
        rotation: { x: 0, y: -120, z: 0 },
        rotation1:{x: 0, y: -120, z: 0},
        position1: { x: -30, y: 5, z: 5 },
        src: "./assets/360_images/place-main_gate.jpg",
        title: "Master Bedroom",
        id: "main_gate"
      },
      home: {
        position: { x: 30, y: 5, z: -15 },
        rotation: { x: 0, y: -90, z: 0 },
        rotation1:{x: 0, y: -90, z: 0 },
        position1: { x: -30, y: 5, z: 5 },
        src: "./assets/360_images/place-home.jpg",
        title: "My Room",
        id: "home"
      },
      work_room: {
        position: {x: -10, y: 5, z: -60 },
        rotation: {x: 0, y: -350, z: 0},
        rotation1:{x: 0, y: -350, z: 0},
        position1: { x: -30, y: 5, z: 5 },
        src: "./assets/360_images/place-work_room.jpg",
        title: "Work Room",
        id: "work_room"
      }
    };

    for (var key in details) {
      const item = details[key];
      // Thubnail Element
      const thumbNail = this.createThumbNail(item);
      // Title
      const title = this.createTitleEl(item);
      thumbNail.appendChild(title);
      //const border = this.createBorder(item)
     // thumbNail.appendChild(border);
      this.placesContainer.appendChild(thumbNail);
    }
  },

  createThumbNail: function(item) {
    const entityEl = document.createElement("a-entity");
    const id = `place-${item.id}`;
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("id", id);
    entityEl.setAttribute("geometry", {
      primitive: "circle",
      radius: 3
    });
    entityEl.setAttribute("position", item.position);
    entityEl.setAttribute("rotation", item.rotation);
    entityEl.setAttribute("material", { src: item.src, opacity: 0.6 });
    entityEl.setAttribute("cursor-listener", {});
    return entityEl;
  },
  //createBorder: function(item) {
   // const entityEl = document.createElement("a-entity");
  //  const id = `place-${item.id}`;
   // entityEl.setAttribute("id",id)
   // entityEl.setAttribute("visible",true)
   // entityEl.setAttribute("geometry",{primitive: "ring", radiusInner: 4, radiusOuter: 5})
  //  entityEl.setAttribute("position", item.position1)
   // entityEl.setAttribute("rotation", item.rotation1)
   // entityEl.setAttribute("material", {color: "#0077CC", opacity: 1})
   // entityEl.setAttribute("cursor-listener", {})
   // return entityEl
  //},
  createTitleEl: function(item) {
    const entityEl = document.createElement("a-entity");
    const id = `title-${item.id}`;
    entityEl.setAttribute("text", {
      font: "exo2bold",
      align: "center",
      width: 50,
      color: "#e91e63",
      value: item.title
    });
    const position = { x: 0, y: -4, z: 0 };
    entityEl.setAttribute("position", position);

    if (item.title === "Main Gate") {
      entityEl.setAttribute("rotation", { x: 180, y: 180, z: 0 });
      entityEl.setAttribute("position", { x: 0, y: 4, z: 0 });
    }
    entityEl.setAttribute("visible", true);
    return entityEl;
  },
  showView: function() {
    const { selectedPlace } = this.data;
    const skyEl = document.querySelector("#main-container");
    skyEl.setAttribute("material", {
      src: `./assets/360_images/${selectedPlace}.jpg`,
      color: "#fff"
    });
  },
  update: function() {
    window.addEventListener("keydown", e => {
      if (e.key === "ArrowUp") {
        if (this.data.zoomAspectRatio <= 10) {
          this.data.zoomAspectRatio += 0.002;
          this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
        }
      }
      if (e.key === "ArrowDown") {
        if (this.data.zoomAspectRatio > 1) {
          this.data.zoomAspectRatio -= 0.002;
          this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
        }
      }
    });
  }
});