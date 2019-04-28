import React from "react";
import imagesJson from "./image.json";
import { deepFreeze } from "./deepFreeze";
import ImageCard from "./images/imageCard";

function shuffle(arr) {
  const values = [...arr];
  let i, j, temp;
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
  const [win, setWin] = React.useState(false);

  const [images, updateImages] = React.useState(deepFreeze(imagesJson));
  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li className="brand">
              <h1>Memory Game</h1>
            </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">

            <li className="restartB">
              <button
                onClick={() => {
                  setFailure(false);
                  setWin(false);
                  updateImages(shuffle(imagesJson));
                }}
              >Restart</button>
            </li>
          </ul>
          </div>
        </nav>

        <header className="header">
          {failure && <h1>Incorrect guess. Please restart to play again.</h1>}
          {win && (
            <h1>You win! Have a virtual cookie! Restart to play again.</h1>
          )}
        </header>

        <div className="cards">
          {images.map((image, i) => (
            <ImageCard
              id={image.id}
              key={image.id}
              image={image.image}
              clicked={image.clicked}
              guess={() => {
                if (win) {
                  return;
                }
                if (failure) {
                  return;
                }
                if (image.clicked) {
                  setFailure(true);
                  return;
                }
                const newImage = {
                  ...image,
                  clicked: true
                };
                // const newArr = shuffle(images.map(image => {
                //   if (image.id === newImage.id) {
                //     return newImage
                //   }
                //   return image;
                // }));
                const newArr = shuffle([
                  newImage,
                  ...images.filter(image => image.id !== newImage.id)
                ]);

                if (newArr.filter(image => image.clicked === true ).length === 12) {
                  setWin(true);
                }
                updateImages(newArr);
              }}
            />
          ))}
        </div>

        <div className="score">
          <h1>
            Score:{" "}
            {images.reduce((acc, image) => {
              if (image.clicked) {
                return acc + 1;
              }
              return acc;
            }, 0)}
          </h1>
        </div>

        <footer className="footer">
          <div className="bottom text-center">Memory Game</div>
          <div className="bottom text-center">Lena Hamilton 2019</div>
        </footer>
      </div>
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
