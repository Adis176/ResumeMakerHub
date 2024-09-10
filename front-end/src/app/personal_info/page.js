"use client";
import React, { useState, useEffect } from "react";
import MyButton from "../../Components/Button/Button";
import MyInput from "../../Components/Input/Input";
import MyDropdown from "../../Components/Dropdown/Dropdown.js";
import MyCheckbox from "../../Components/Checkbox/Checkbox.js";
import "./personal_info.css";
export default function page() {
  const [check, setCheck] = useState(true);
  function handleCheckbox() {
    setCheck(!check);
  }
  
  const fontFamily = [
    {
      "name": "Computer Modern Roman",
      "package": "",
      "code": "cmr"
    },
    {
      "name": "Latin Modern Roman",
      "package": "lm",
      "code": "lm"
    },
    {
      "name": "Bookman",
      "package": "bookman",
      "code": "pbk"
    },
    {
      "name": "Charter",
      "package": "charter",
      "code": "bch"
    },
    {
      "name": "Computer Modern Sans Serif",
      "package": "cmss",
      "code": "cmss"
    },
    {
      "name": "Latin Modern Sans Serif",
      "package": "lm",
      "code": "lmss"
    },
    {
      "name": "TEX Gyre Adventor",
      "package": "tgadventor",
      "code": "qag"
    },
    {
      "name": "TEX Gyre Heros",
      "package": "tgheros",
      "code": "qhv"
    },
    {
      "name": "Helvetica",
      "package": "helvet",
      "code": "phv"
    },
    {
      "name": "Computer Modern Typewriter",
      "package": "cmtt",
      "code": "cmtt"
    },
    {
      "name": "Latin Modern Sans Typewriter",
      "package": "lm",
      "code": "lmtt"
    },
    {
      "name": "TEX Gyre Cursor",
      "package": "tgcursor",
      "code": "qcr"
    },
    {
      "name": "Times",
      "package": "mathptmx",
      "code": "ptm"
    },
    {
      "name": "Utopia / Fourier",
      "package": "utopia / fourier",
      "code": "put"
    },
    {
      "name": "Palatino",
      "package": "palatino",
      "code": "ppl"
    },
    {
      "name": "TEX Gyre Termes",
      "package": "tgtermes",
      "code": "qtm"
    },
    {
      "name": "TEX Gyre Pagella",
      "package": "tgpagella",
      "code": "qp1"
    },
    {
      "name": "TEX Gyre Bonum",
      "package": "tgbonum",
      "code": "qbk"
    },
    {
      "name": "TEX Gyre Schola",
      "package": "tgschola",
      "code": "qcs"
    },
    {
      "name": "Courier",
      "package": "courier",
      "code": "pcr"
    }
  ]
  function handleFont(val){
    console.log("Selected val for font: ", val);
    setFont(val);
  }
  
  async function handleInfoSubmit(formData) {
    // console.log("name: ", check);
    let currData = {
      name: formData.get("name"),
      email: formData.get("email"),
      number: formData.get("number"),
      type: formData.get("type"),
      size: formData.get("size"),
      role: formData.get("role"),
      portfolio: formData.get("portfolio"),
      mt: formData.get("mt"),
      mr: formData.get("mr"),
      mb: formData.get("mb"),
      ml: formData.get("ml"),
      linkedin: formData.get("linkedin"),
      instagram: formData.get("instagram"),
      facebook: formData.get("facebook"),
      git: formData.get("git"),
      address: formData.get("address"),
      summary: formData.get("summary"),
      icon: check,
    };
    console.log("final details: ", currData);
    try {
      const response = await fetch(
        "http://localhost:5000/api/save-personal-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: currData }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save file");
      }

      const result = await response.text();
      console.log("Success: ", result);
    } catch (error) {
      console.error("Error saving file:", error);
    }
  }
  return (
    <div
      className="container flex flex-col items-center justify-center p-6"
      style={{ minHeight: "100vh" }}
    >
      <form
        action={handleInfoSubmit}
        className="border-[0.7px] border-slate-400 border-solid rounded-lg shadow-xl gradient-bg p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 md:gap-y-4 xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-x-1 items-center">
          <MyInput
            color="classic"
            variant="outlined"
            size="small"
            label="Name"
            name="name"
            required={true}
          />
          <MyInput
            color="classic"
            variant="outlined"
            size="small"
            label="Email"
            name="email"
            required={false}
          />
          <MyInput
            color="classic"
            variant="outlined"
            size="small"
            label="Number"
            name="number"
            required={false}
          />
          <MyInput
            color="classic"
            variant="outlined"
            size="small"
            label="Font Type"
            name="type"
            required={false}
          />
          <MyInput
            color="classic"
            variant="outlined"
            size="small"
            label="Font Size"
            name="size"
            required={false}
          />
          <MyInput
            color="classic"
            variant="outlined"
            size="small"
            label="Role Details"
            name="role"
            required={false}
          />
          <MyInput
            color="classic"
            variant="outlined"
            size="small"
            label="Website Details"
            name="portfolio"
            required={false}
          />
          <div className="flex flex-row items-center justify-between">
            <MyInput
              color="classic"
              variant="outlined"
              size="small"
              label="top-margin"
              name="mt"
              defaultValue="0"
              type="number"
              required={false}
            />
            <MyInput
              color="classic"
              variant="outlined"
              size="small"
              label="bottom-margin"
              name="mb"
              defaultValue="0"
              type="number"
              required={false}
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <MyInput
              color="classic"
              variant="outlined"
              size="small"
              label="left-margin"
              name="ml"
              defaultValue="0"
              type="number"
              required={false}
            />
            <MyInput
              color="classic"
              variant="outlined"
              size="small"
              label="right-margin"
              name="mr"
              defaultValue="0"
              type="number"
              required={false}
            />
          </div>
          <MyInput
            color="classic"
            variant="outlined"
            size="small"
            label="LinkedIn"
            name="linkedin"
            required={false}
          />
          <MyInput
            color="classic"
            variant="outlined"
            size="small"
            label="GitHub"
            name="git"
            required={false}
          />
          <MyInput
            color="classic"
            variant="outlined"
            size="small"
            label="Instagram"
            name="instagram"
            required={false}
          />
          <MyInput
            color="classic"
            variant="outlined"
            size="small"
            label="Facebook"
            name="facebook"
            required={false}
          />
          <MyInput
            color="classic"
            variant="outlined"
            size="small"
            label="X"
            name="x"
            required={false}
          />
          <MyInput
            color="classic"
            variant="outlined"
            size="small"
            label="Address"
            name="address"
            required={false}
          />
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-6 justify-between items-start py-4">
          <MyInput
            color="classic"
            className="md:col-span-4 rounded-none rounded-l-2xl"
            variant="outlined"
            size="small"
            label="Summary"
            name="summary"
            required={false}
            multiline={true}
            mt={'mt-0'}
            mb={'mb-0'}
          />
          <MyCheckbox
            className="md:col-span-2 w-full border-[2px] border-solid border-slate-400 max-h-full overflow-hidden rounded-r-2xl"
            name="icon"
            label="Icons for Socials"
            onClick={handleCheckbox}
          />
        </div>
        <div className=" flex flex-row items-center justify-center mx-auto my-4">
          <MyButton
            type="submit"
            size="xxl"
            color="btn4"
            text="Submit Personal Info"
          />
        </div>
      </form>
    </div>
  );
}
