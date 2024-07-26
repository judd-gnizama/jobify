import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
            perferendis eaque esse at molestiae, asperiores architecto quas ab
            iste incidunt doloremque cumque quod nesciunt suscipit repellat
            laudantium odit! Tempora aut nobis dolorem consectetur consequuntur
            officia temporibus adipisci! Cumque voluptate illum a, eum nostrum
            voluptatum quasi, in, qui eaque accusamus totam!
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
