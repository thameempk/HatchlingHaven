import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <>
    <footer className="text-center text-lg-start bg-body-tertiary text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-google"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>{" "}
                  <Link className="text-decoration-none text-dark" to={"/"}>
                    <img
                      style={{ maxHeight: 30 }}
                      src={require("../../images/Your paragraph text.png")}
                      alt=""
                    />
                    <span style={{ color: "#818181" }}>BaBy</span>{" "}
                    <span style={{ color: "#Ee222a" }}>.</span>
                  </Link>
                </h6>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                  <ul><li>clothes</li>
                  <li>Nursery</li></ul>
                  <ul><li>toys</li>
                  <li>nutrition</li></ul>

              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                    Pricing
                </p>
                <p>
                    Settings
                </p>
                <p>
                    Orders
                </p>
                <p>
                    Help
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                <i style={{ color: "#Ee222a",maxHeight:"50px"}} class="bi bi-geo-alt"></i> Kerala , india
                </p>
                <p>
                <i style={{ color: "#Ee222a",maxHeight:"50px"}} class="bi bi-envelope-at"></i>
                 thameempk292@gmail.com
                </p>
                <p>
                <i style={{ color: "#Ee222a",maxHeight:"50px"}} class="bi bi-telephone"></i> + 01 234 567 88
                </p>
                <p>
                <i style={{ color: "#Ee222a",maxHeight:"50px"}} class="bi bi-printer"></i> + 01 234 567 89
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2023 Copyright:
          <Link className="text-decoration-none text-dark" to={"/"}>
          <img
                      style={{ maxHeight: 30 }}
                      src={require("../../images/Your paragraph text.png")}
                      alt=""
                    />
            <span style={{ color: "#818181" }}>BaBy</span>{" "}
            <span style={{ color: "#Ee222a" }}>.</span>
          </Link>
        </div>
      </footer>

    </>
  )
}

export default Footer