"use client";

import { useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";

export const FormAPIComponent = ({ id, layer }: any) => {
  const [selectedCode, setSelectedCode] = useState("HTML");

  const listCode = ["HTML", "JAVASCRIPT (AXIOS)", "JAVASCRIPT (FETCH)"];
  const convertTypeOfPropertyToInputType = (type: string) => {
    switch (type) {
      case "title":
        return "text";
      case "email":
        return "email";
      case "number":
        return "number";
      case "date":
        return "date";
      case "tel":
        return "tel";
      default:
        return "text";
    }
  };

  const codeOfList: any = {
    HTML: `<form action="https://unclelife.co/api/form/public/${id}" method="POST">
      ${layer.map((item: any) => {
        return `<label for="${item.mapTo}">${item.label}</label>
      <input type="${convertTypeOfPropertyToInputType(item.type)}" id="${
          item.mapTo
        }" name="${item.mapTo}">`;
      }).join(`
      `)}
      <button type="submit">Submit</button>
  </form>`,
    "JAVASCRIPT (AXIOS)": `const axios = require('axios');

    // Create a data object
    const data = {
      ${layer
        .map((item:any) => {
          return `"${item.mapTo}": ${item.mapTo},`;
        })
        .join("\n       ")}
    };
    
    // Create a configuration object
    const config = {
      method: 'post',
      url: 'https://unclelife.co/api/form/public/${id}',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    
    // Send the HTTP request
    axios(config)
      .then(response => {
        console.log(response.data); // Handle the response here
      })
      .catch(error => {
        console.error(error); // Handle errors here
      });`,
    "JAVASCRIPT (FETCH)": `const fetch = require('node-fetch');

    // Create a data object
    const data = JSON.stringify({
      ${layer
        .map((item:any) => {
          return `"${item.mapTo}": ${item.mapTo},`;
        })
        .join("\n       ")}
    });
    
    // Create headers
    const myHeaders = {
      'Content-Type': 'application/json'
    };
    
    // Create options for the HTTP request
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data
    };
    
    // Send the HTTP request
    fetch('https://unclelife.co/api/form/public/${id}', requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result); // Handle the response here
      })
      .catch(error => {
        console.error('error', error); // Handle errors here
      });`,
  };

  const handleCodeSelect = (code: string) => {
    setSelectedCode(code);
  };

  return (
    <div className="mt-3">
      <h2 className="text-2xl font-bold">Form API</h2>
      <div className="flex mt-3">
        {listCode.map((code) => (
          <div
            key={code}
            className={`mr-3 cursor-pointer border-2 rounded-md px-2 py-1 w-32 h-23 flex justify-center items-center mb-5 text-center ${
              selectedCode === code ? "font-bold border-red-500" : "border-gray-300"
            }`}
            onClick={() => handleCodeSelect(code)}
          >
            {code}
          </div>
        ))}
      </div>
      <CodeBlock
        text={codeOfList[selectedCode]}
        language={
          selectedCode === "HTML"
            ? "html"
            : selectedCode === "JAVASCRIPT (AXIOS)" ||
              selectedCode === "JAVASCRIPT (FETCH)"
            ? "javascript"
            : ""
        }
        showLineNumbers={true}
        theme={dracula}
      />
    </div>
  );
};
