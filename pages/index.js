import Head from "next/head";
import React, { useState } from "react";
import QRCode from "qrcode";

export default function Home() {
  // we create a hook to handle the state of the form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    email: "",
  });

  const handleInputChange = (event, inputName) => {
    // we create a new object to store the new state
    const newFormData = { ...formData };
    // we update the value of the input
    newFormData[inputName] = event.target.value;
    // we update the state
    setFormData(newFormData);
  };

  const getVCardData = async (params) => {
    const response = await fetch("/api/vcard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    return response.json();
  };

  const handleFormSubmit = () => {
    getVCardData(formData).then((data) => {
      console.log(data);
      const canvas = document.getElementById("canvas");
      // render the QR
      QRCode.toCanvas(canvas, data.vcard, function (error) {
        if (error) console.error(error);
        console.log("success!");
      });
    });
  };

  return (
    <div className="bg-gray-800 text-gray-100 px-8 py-12">
      <Head>
        <title>vCard to QR</title>
        <meta
          name="description"
          content="Generate a QR with your contact information"
        />
        {/* When we have a better icon, uncomment the line below */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      {/* put the content of the page here */}
      <main>
        <div className="text-center w-full"></div>
        <div className="max-w-screen-xl mt-24 px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Generate a QR with your contact information
              </h2>
              <div className="mt-8">
                <canvas id="canvas"></canvas>
              </div>
            </div>
          </div>
          <div className="">
            <div>
              <span className="uppercase text-sm text-gray-600 font-bold">
                First Name
              </span>
              <input
                className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder=""
                value={formData.firstName}
                onChange={(e) => handleInputChange(e, "firstName")}
              />
            </div>
            <div>
              <span className="uppercase text-sm text-gray-600 font-bold">
                Last Name
              </span>
              <input
                className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder=""
                value={formData.lastName}
                onChange={(e) => handleInputChange(e, "lastName")}
              />
            </div>
            <div>
              <span className="uppercase text-sm text-gray-600 font-bold">
                Company
              </span>
              <input
                className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder=""
                value={formData.company}
                onChange={(e) => handleInputChange(e, "company")}
              />
            </div>
            <div>
              <span className="uppercase text-sm text-gray-600 font-bold">
                Phone
              </span>
              <input
                className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="tel"
                placeholder=""
                value={formData.phone}
                onChange={(e) => handleInputChange(e, "phone")}
              />
            </div>
            <div>
              <span className="uppercase text-sm text-gray-600 font-bold">
                Email
              </span>
              <input
                className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder=""
                value={formData.email}
                onChange={(e) => handleInputChange(e, "email")}
              />
            </div>
            <div className="mt-8">
              <button
                onClick={handleFormSubmit}
                className="uppercase text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
              >
                Generate QR
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* if we want a footer in the future, uncomment the footer section below */}
      {/* <footer classNameName={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span classNameName={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
}
