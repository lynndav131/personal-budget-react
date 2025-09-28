import bg from "../bg.png"; // adjust path if needed

function Hero() {
  return (
    <header
      className="hero"
      style={{
        height: "350px",
        backgroundColor: "#b4c6f0",
        backgroundImage: `url(${bg})`,
        backgroundSize: "400px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
        paddingTop: "40px",
        textAlign: "center"
      }}
    >
      <h1>Personal Budget</h1>
      <h2>A personal-budget management app</h2>
    </header>
  );
}

export default Hero;
