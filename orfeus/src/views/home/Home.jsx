import React from "react";
import home_styles from "./Home.module.css";
import { Component, useState, useEffect  } from "react";
import { Link } from "react-router-dom";

function ScrollUpButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className={home_styles.scroll_button_up} onClick={handleClick}>
      &#x25B2;
    </button>
  );
}

function CheckLogin(){
  const LoginCheck = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken != null) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    return loggedIn
  }
}

function ScrollDownButton() {
  const handleClick = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <button className={home_styles.scroll_button_down} onClick={handleClick}>
      &#x25BC;
    </button>
  );
}

export default class Home extends Component {
  render() {
    return (
      <body>
        <h1 className={home_styles.header1}>WELCOME TO ORFEUS</h1>
        <div className={home_styles.entire_page}>
          <div className={home_styles.home_page_a}>
            <div className={home_styles.container}>
              <h2 className={home_styles.title}>
                <span
                  className={`${home_styles.title_word} ${home_styles.title_word_1}`}
                >
                  Web{" "}
                </span>
                <span
                  className={`${home_styles.title_word} ${home_styles.title_word_2}`}
                >
                  based{" "}
                </span>
                <span
                  className={`${home_styles.title_word} ${home_styles.title_word_3}`}
                >
                  music{" "}
                </span>
                <span
                  className={`${home_styles.title_word} ${home_styles.title_word_4}`}
                >
                  generation
                </span>
              </h2>
            </div>
          </div>
          <br></br>
          <div className={home_styles.home_page_2}>
            <text className={home_styles.generate_music_text}>
            {CheckLogin ? (
              <>
                <Link to="/account" className={home_styles.step1}>LOGIN TO YOUR ACCOUNT</Link>
                <Link to="/generate" className={home_styles.step2}>UPLOAD YOUR OWN MUSIC</Link>
                <Link to="/generate" className={home_styles.step3}>PICK A GENRE TO INFLUENCE YOUR MUSIC</Link>
                <Link to="/library" className={home_styles.step4}>ENJOY YOUR CREATION</Link>
              </>
            ):null}
            </text>
          </div>
          </div>
      </body>
    );
  }
}
