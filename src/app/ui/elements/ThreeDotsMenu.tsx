import { ReactElement } from 'react';

import styled from 'styled-components';

export const ThreeDotsMenu = (): ReactElement => {
  return (
    <StyledThreeDotsMenu>
      <input type="checkbox" className="toggler" id="three-dots-menu" />
      <div className="dots">
        <div />
      </div>
      <div className="menu">
        <div>
          <ul>
            <li>
              <a href="#" className="link">
                Option one
              </a>
            </li>
            <li>
              <a href="#" className="link">
                Option two
              </a>
            </li>
            <li>
              <a href="#" className="link">
                Option three
              </a>
            </li>
          </ul>
        </div>
      </div>
    </StyledThreeDotsMenu>
  );
};

const StyledThreeDotsMenu = styled.div`
  position: relative;
  height: 25px;
  width: 25px;

  .dots {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .dots > div,
  .dots > div:after,
  .dots > div:before {
    height: 6px;
    width: 6px;
    background-color: rgba(237, 237, 237, 0.812); // dots color
    border-radius: 50%;
    transition: 0.5s;
  }

  .dots > div {
    position: relative;
  }

  .dots > div:after,
  .dots > div:before {
    content: '';
    position: absolute;
    left: 0;
  }

  .dots > div:before {
    top: -10px;
  }

  .dots > div:after {
    bottom: -10px;
  }

  .halo {
    animation: halo-effect 0.5s ease-out;
  }

  @keyframes halo-effect {
    0% {
      box-shadow: 0 0 2px 1rem rgba(255, 255, 255, 0.5);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
  }

  .toggler {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    appearance: none;
    cursor: pointer;
    z-index: 2;
  }

  .toggler:checked + .dots > div {
    background-color: rgba(237, 237, 237, 0.812); // dots color
    animation: halo-effect 0.5s ease-out;
  }

  .menu {
    position: absolute;
    right: -10px;
    top: calc(-12px + 50px);
    width: 0;
    height: 0;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px 15px;
    box-shadow: 2px 4px 6px rgba(49, 49, 49, 0.2);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: 0.5s;
  }

  .menu ul {
    list-style: none;
  }

  .menu ul li {
    margin: 15px 0;
  }

  .menu ul li .link {
    text-decoration: none;
    color: rgba(49, 49, 49, 0.85);
    opacity: 0;
    visibility: hidden;
    transition: 0.5s ease 0.3s;
  }

  .toggler:checked ~ .menu {
    opacity: 1;
    visibility: visible;
    width: 150px;
    height: 130px;
  }

  .toggler:checked ~ .menu ul .link {
    opacity: 1;
    visibility: visible;
  }

  .toggler:checked ~ .menu ul .link:hover {
    color: #2980b9;
    transition: 0.2s;
  }

  .toggler:not(:checked) ~ .menu {
    transition: 0.5s;
  }

  .toggler:not(:checked) ~ .menu ul .link {
    opacity: 0;
    visibility: hidden;
    transition: 0.1s;
  }
`;
