import React from "react";
import imagesJson from './image.json'
import {deepFreeze} from './deepFreeze'
import ImageCard from './images/imageCard'
 
function shuffle(arr) {
  let values = [...arr]
  var i,
      j,
      temp;
  for (i = values.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = values[i];
      values[i] = values[j];
      values[j] = temp;
  }
  return values;    
};

function App() {

  const [images, updateImages] = React.useState((imagesJson));
  return (
    <div>
      <div>   
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <ul>
            <li class="brand">
              <a href="/">Memory Game</a>
            </li>

            <li>Restart</li>
          </ul>
        </nav>
        <header class="header">
          <h1>Score: {images.reduce((acc, image) => {
            if (image.clicked) {
              return acc +1;
            }
            return acc;
          },0)}</h1>
        </header>
        <div class="cards">
        {images.map((image, i )=> (
          <ImageCard
            id={image.id}
            key={image.id}
            image={image.image}
            clicked={image.clicked}
            guess={() => {
              image.clicked = true
              let newArr = shuffle(images)
              updateImages (newArr)
            }}
          />
        ))}
        </div>
        <footer class="footer">
          <div class="bottom">
            Memory
          </div>
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
