import React from "react";
import { Button } from "react-bootstrap";
import { AiOutlineHome } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="h-100 d-flex justify-content-center align-items-center flex-column text-white">
      <h3 className="display-3">Uh Oh! We've got some problem.</h3>
      <h2 className="display-3 text-bg-danger p-2 rounded-2 shadow-md text-uppercase">
        {error.message || error.statusText}
      </h2>
      <div className="mt-3">
        <Button variant="warning" className="fs-4 mx-3" onClick={() => navigate(-1)}>
          <BiArrowBack />
          Go Back
        </Button>
        <Link to="/">
          <Button variant="warning" className="fs-4">
            Go Home <AiOutlineHome size="" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
