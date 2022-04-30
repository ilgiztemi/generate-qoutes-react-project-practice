import React, { Component } from "react";
import "./styles.css";

class App extends Component {
  constructor() {
    console.log("constructor");
    super();
    this.state = {
      quotes: [],
      index: 0,
      isLoading: false
    };
  }

  componentDidMount() {
    const url = "https://type.fit/api/quotes";

    fetch(url)
      .then((res) => res.json())
      .then((data) =>
        setTimeout(() => {
          this.setState({ quotes: data, isLoading: true });
        }, 1000)
      )
      .catch((error) => console.log(error));
  }

  handleNext = () => {
    const { index, quotes } = this.state;
    if (index < quotes.length - 1) {
      this.setState({ index: index + 1 });
    }
  };

  handlePrevious = () => {
    const { index } = this.state;
    if (index > 0) {
      this.setState({ index: index - 1 });
    }
  };

  render() {
    const { quotes, index, isLoading } = this.state;

    // const content = isLoading ? (
    //   <>
    //     <p id="quote">
    //       <i>{quotes[index].text}</i>
    //     </p>
    //     <p id="author">{quotes[index].author}</p>
    //   </>
    // ) : (
    //   <i className="fa fa-spinner fa-spin" style={{ fontSize: "48px" }}></i>
    // );

    const customClass = quotes[index]?.author ? "" : "no-author";
    // const customClass = isLoading
    //   ? quotes[index].author
    //     ? ""
    //     : "no-author"
    //   : "";

    return (
      <div className="App">
        <div className="container">
          {isLoading ? (
            <>
              <p id="quote">
                <i>{quotes[index].text}</i>
              </p>
              <p id="author" className={customClass}>
                {quotes[index].author ? quotes[index].author : "No Author"}
              </p>
              <div className="btns">
                <button onClick={this.handlePrevious}>Previous</button>
                <button onClick={this.handleNext}>Next</button>
                <p>
                  {index + 1}/{quotes.length}
                </p>
              </div>
            </>
          ) : (
            <i
              className="fa fa-spinner fa-spin"
              style={{ fontSize: "48px" }}
            ></i>
          )}
        </div>
      </div>
    );
  }
}

export default App;
