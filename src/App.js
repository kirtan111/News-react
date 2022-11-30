import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";

const App = (props) => {
    const [progress, setprogress] = useState(0);

    // setprogress(progress);

    const pagesize = 21;

    const apiKey = "e17ab16fb44e4dc8831a992f69b9cd26";

    return (
        <div>
            <Router>
                <NavBar />
                <LoadingBar color={"#1E90FF"} apiKey={apiKey} style={{ height: "4px" }} progress={progress} />
                <Routes>
                    <Route exact path="/" element={<News setprogress={setprogress} apiKey={apiKey} key="General" pagesize={pagesize} country="us" catagory="General" />}></Route>
                    <Route exact path="/Business" element={<News setprogress={setprogress} apiKey={apiKey} key="Business" pagesize={pagesize} country="us" catagory="Business" />}></Route>
                    <Route exact path="/Entertainment" element={<News setprogress={setprogress} apiKey={apiKey} key="Entertainment" pagesize={pagesize} country="us" catagory="Entertainment" />}></Route>
                    <Route exact path="/General" element={<News setprogress={setprogress} apiKey={apiKey} key="General" pagesize={pagesize} country="us" catagory="General" />}></Route>
                    <Route exact path="/Health" element={<News setprogress={setprogress} apiKey={apiKey} key="Health" pagesize={pagesize} country="us" catagory="Health" />}></Route>
                    <Route exact path="/Science" element={<News setprogress={setprogress} apiKey={apiKey} key="Science" pagesize={pagesize} country="us" catagory="Science" />}></Route>
                    <Route exact path="/Sports" element={<News setprogress={setprogress} apiKey={apiKey} key="Sports" pagesize={pagesize} country="us" catagory="Sports" />}></Route>
                    <Route exact path="/Technology" element={<News setprogress={setprogress} apiKey={apiKey} key="Technology" pagesize={pagesize} country="us" catagory="Technology" />}></Route>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
