import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AudioCompresser from "./routes/AudioProcess/audioCompresser";
import ImageCompresser from './routes/ImageProcess/imageCompresser'
import ImageResizer from "./routes/ImageProcess/imageResizer";
import About from "./routes/About/about";

function App(){
  return (
    <>
    <Header />
    <div className="body">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/image-compresser" element={<ImageCompresser/>}/>
          <Route path='/image-resizer' element={<ImageResizer/>}/>
          <Route path="/audio-compresser" element={<AudioCompresser/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </Router>
      </div>
    <Footer />
    </>
  )
}


export default App
