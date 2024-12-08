import { Link } from "react-router-dom";

// ====================================== Style ===============================
const notFoundStyle = {
  position: "relative",
  height: "100vh",
  background: "#030005",
};

const notFoundContentStyle = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "767px",
  width: "100%",
  lineHeight: "1.4",
  textAlign: "center",
};

const notFound404Style = {
  position: "relative",
  height: "180px",
  marginBottom: "20px",
  zIndex: "-1",
};

const titleStyle = {
  fontFamily: '"Montserrat", sans-serif',
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "224px",
  fontWeight: "900",
  marginTop: "0px",
  marginBottom: "0px",
  marginLeft: "-12px",
  color: "#030005",
  textTransform: "uppercase",
  textShadow: "-1px -1px 0px #8400ff, 1px 1px 0px #ff005a",
  letterSpacing: "-20px",
};

const subTitleStyle = {
  fontFamily: '"Montserrat", sans-serif',
  position: "absolute",
  left: "0",
  right: "0",
  top: "110px",
  fontSize: "42px",
  fontWeight: "700",
  color: "#fff",
  textTransform: "uppercase",
  textShadow: "0px 2px 0px #8400ff",
  letterSpacing: "13px",
  margin: "0",
};

const linkStyle = {
  fontFamily: '"Montserrat", sans-serif',
  display: "inline-block",
  textTransform: "uppercase",
  color: "#ff005a",
  textDecoration: "none",
  border: "2px solid",
  background: "transparent",
  padding: "10px 40px",
  fontSize: "14px",
  fontWeight: "700",
  transition: "0.2s all",
};

const linkHoverStyle = {
  color: "#8400ff",
};

// ====================================== Component ===============================
const NotFound = () => {
  return (
    <div className="h-screen w-screen">
      <div style={notFoundStyle}>
        <div style={notFoundContentStyle}>
          <div style={notFound404Style}>
            <h1 style={titleStyle}>404</h1>
            <h2 style={subTitleStyle}>Page Not Found</h2>
          </div>
          <Link
            to={"/"}
            style={linkStyle}
            onMouseEnter={(e) => (e.target.style.color = linkHoverStyle.color)}
            onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
