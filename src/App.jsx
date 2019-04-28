import React from "react";
import imagesJson from './image.json'
import {deepFreeze} from './deepFreeze'
import ImageCard from './images/imageCard'
 
function App() {
  const [images, updateImages] = React.useState(deepFreeze(imagesJson));
  return (
    <div>
      <div>   
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <ul>
            <li class="brand">
              <a href="/">Memory Game</a>
            </li>
            {/* <li class="">You guessed incorrectly!</li> */}
            <li>Score: 0 | Top Score: 12</li>
          </ul>
        </nav>
        <header class="header">
          <h1>Memory</h1>
          <h2>
            Instructions on how to play
          </h2>
        </header>
        <div class="cards">
        {images.map(image => (
          <ImageCard
            id={image.id}
            key={image.id}
            image={image.image}
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

export default App;
