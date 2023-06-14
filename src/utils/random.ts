  function randomNumbers(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let result = Math.floor(Math.random() * (max - min) + min);
    if (result >= max) {
      result = max - 1;
    }
    return result;
  }
  
  const colors = [
    "#E34D8C",
    "#C04277",
    "#7D2A4D",
    "#7000FF",
    "#6200E3",
    "#36007D",
    "#349974",
    "#2A7D5F",
    "#153D2E",
    "#6100FF",
    "#5700E3",
    "#30007D",
  ];
  
const randomColorAvatar = () => {
    const color = colors[randomNumbers(0, colors.length)];
    return color;
}

export {
  randomColorAvatar,
  randomNumbers,
}

