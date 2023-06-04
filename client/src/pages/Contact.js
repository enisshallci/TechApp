import React from "react";
import Layout from "./../components/Layout/Layout";
import SupportEngine from "./SupportEngine";
const Contact = () => {
  return (
    <Layout title={"Contact Us - GalaxyTech"}>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
      </div>
      <SupportEngine/>
    </Layout>
  );
};

export default Contact;
