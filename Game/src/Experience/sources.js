export let FightingGameSources = [
  {
    name: "characterAnimation",
    type: "fbx",
    path: "/models/FightingGame/Player/Animations/Char1@Death.FBX",
  },
  {
    name: "character",
    type: "fbx",
    path: "/models/FightingGame/Player/Model/PlayerRig.FBX",
  },
  {
    name: "gameBackground",
    type: "texture",
    path: "/textures/FightingGame/gameBackground1.jpg",
  },
  {
    name: "fightingGameFloor",
    type: "gltfModel",
    path: "/models/FightingGame/floor_stones_tilleable/scene.gltf",
  },
];

export let sources = [
  {
    name: "Earth",
    type: "gltfModel",
    path: "/models/Earth/scene.gltf",
  },
  {
    name: "sea_house",
    type: "gltfModel",
    path: "/models/sea_house/scene.gltf",
  },
  {
    name: "portal2",
    type: "gltfModel",
    path: "/models/portal2/portal2.gltf",
  },
  {
    name: "background",
    type: "cubeTexture",
    path: "/textures/environmentMap/MainBackgroundCubeTexture/",
    pictures: ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
  },
];
