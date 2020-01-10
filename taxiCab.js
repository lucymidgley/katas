const directionsArray = function(array) {
  return array.filter(function(item) {
    return (item === "right" || item === "left");
  });
};

const numberArray = function(array) {
  return array.filter(function(item) {
    return (item !== "right" && item !== "left");
  });
};

const NSEW = function(leftOrRight, prev) {
  let output = "";
  if (leftOrRight === "left")
    switch (prev) {
    case "north":
      output += "west";
      break;
    case "south":
      output += "east";
      break;
    case "east":
      output += "north";
      break;
    case "west":
      output += "south";
      break;
    }
  else { //so direction given is right
    switch (prev) {
    case "north":
      output += "east";
      break;
    case "south":
      output += "west";
      break;
    case "east":
      output += "south";
      break;
    case "west":
      output += "north";
      break;
    }
  }
  return output;
};

const geographicalArray = function(dirArray) {
  const firstDir = ((dirArray[0]) === "left" ? "north" : "east");
  let newArray = [firstDir];
  for (let i = 1; i < dirArray.length; i++) {
    newArray.push(NSEW(dirArray[i], newArray[i - 1]));
  }
  return newArray;
};

const directionsObject = function(geoArray, numArray) {
  let obj = {};
  for (let i = 0; i < geoArray.length; i++) {
    if (obj[geoArray[i]]) {
      obj[geoArray[i]] += numArray[i];
    } else {
      obj[geoArray[i]] = numArray[i];
    }
  }
  return obj;
};
const blocksAway = function(array) {
  const nArray = numberArray(array);
  const dArray = directionsArray(array);
  const gArray = geographicalArray(dArray);
  const dObject = directionsObject(gArray, nArray);
  let output = {
    east: 0,
    north: 0
  };
  for (const item in dObject) {
    switch (item) {
    case "north":
      output['north'] += dObject[item];
      break;
    case "south":
      output['north'] -= dObject[item];
      break;
    case "east":
      output['east'] += dObject[item];
      break;
    case "west":
      output['east'] -= dObject[item];
      break;
    }
  }
  return output;
};
console.log(blocksAway(["right", 2, "left", 3, "left", 1]));
console.log(blocksAway(["left", 1, "right", 1, "left", 1, "right", 1, "left", 1, "right", 1]));
console.log(blocksAway(["left", 3, "right", 1, "right", 3, "right", 1]));
console.log(blocksAway(["left", 4, "right", 1, "right", 1, "right", 1]));
console.log(blocksAway(["right", 3, "left", 1, "left", 1, "left", 1]));
console.log(blocksAway(["left", 3, "right", 2, "left", 2, "right", 3]));