import React from "react";
import imagesJson from "./image.json";
import { deepFreeze } from "./deepFreeze";
import ImageCard from "./images/imageCard";

function shuffle(arr) {
  let values = [...arr];
  var i, j, temp;
  for (i = values.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = values[i];
    values[i] = values[j];
    values[j] = temp;
  }
  return values;
}

function App() {
  const [failure, setFailure] = React.useState(false);

  const [images, updateImages] = React.useState(deepFreeze(imagesJson));
  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <ul>
            <li className="brand">
              <a href="/">Memory Game</a>
            </li>

            <li>
              <button
                onClick={() => {
                  setFailure(false);
                  updateImages(shuffle(imagesJson));
                }}
              >
                Restart
              </button>
            </li>
          </ul>
        </nav>
        <header className="header">
          {failure && <h1>Incorrect guess. Please restart to play again.</h1>}
          <h1>
            Score:{" "}
            {images.reduce((acc, image) => {
              if (image.clicked) {
                return acc + 1;
              }
              return acc;
            }, 0)}
          </h1>
        </header>
        <div className="cards">
          {images.map((image, i) => (
            <ImageCard
              id={image.id}
              key={image.id}
              image={image.image}
              clicked={image.clicked}
              guess={() => {
                if (failure) {
                  return;
                }
                if (image.clicked) {
                  setFailure(true);
                } else {
                  const newImage = {
                    ...image,
                    clicked: true
                  };
                  let newArr = shuffle([
                    newImage,
                    ...images.filter(image => image.id !== newImage.id)
                  ]);
                  updateImages(newArr);
                }
              }}
            />
          ))}
        </div>
        <footer className="footer">
          <div className="bottom">Memory</div>
        </footer>
      </div>
      {/* <div>
        <div>
          header with title, score card and start/restart button (where to put
          instructions?)
        </div>
        <div>game, twelve images, shuffles after onClick </div>
        <div>footer</div>
      </div>*/}
    </div>
  );
}

// 1 images sho in random order
// {this.state.numbers.map((num) => {
//   return <RandomImage num={num} randomNumber={this.genNumber}/>
// })}
// 2 clicked turns true after clicked

// 3 reload after click

// 4 count number of trues

// 5 if image clicked again fail
// 6-extra welcome page w/ instructions

export default App;
