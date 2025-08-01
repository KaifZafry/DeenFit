import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Accordion = ({product}) => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  

  const isOpen = (key) => !!openSections[key];

  return (
    <section className="p-3 space-y-4">
      {/* Description */}
      <div className="border-bottom">
        <div
          className="flex justify-between items-center p-3 cursor-pointer"
          onClick={() => toggleSection("description")}
        >
          <span className="font-bold">Description</span>
          <FaChevronDown
            className={`transition-transform duration-300 ${
              isOpen("description") ? "rotate-180" : ""
            }`}
          />
        </div>
        {isOpen("description") && (
          <div className="p-3 border-t">
            <p className="font-medium">Composition:</p>
             <p>{product?.description}</p>
          </div>
        )}
      </div>

      {/* Materials */}
      <div className="border-bottom">
        <div
          className="flex justify-between items-center p-3 cursor-pointer"
          onClick={() => toggleSection("materials")}
        >
          <span className="font-bold">Materials</span>
          <FaChevronDown
            className={`transition-transform duration-300 ${
              isOpen("materials") ? "rotate-180" : ""
            }`}
          />
        </div>
        {isOpen("materials") && (
          <div className="p-3 border-t">
            <ul className="care-list">
                                   <li>100% Cotton fabric</li>
                                   <li>Care: Hand wash</li>
                                   <li>Imported</li>
                                   <li>Machine wash max. 30ºC. Short spin.</li>
                                   <li>Iron maximum 110ºC.</li>
                                   <li>Do not bleach/bleach.</li>
                                   <li>Do not dry clean.</li>
                                   <li>Tumble dry, medium hear.</li>
                                   
            </ul>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="border-bottom">
        <div
          className="flex justify-between items-center p-3 cursor-pointer"
          onClick={() => toggleSection("additional")}
        >
          <span className="font-bold">Additional Information</span>
          <FaChevronDown
            className={`transition-transform duration-300 ${
              isOpen("additional") ? "rotate-180" : ""
            }`}
          />
        </div>
        {isOpen("additional") && (
          <div className="p-3 border-t">
            <table className="table-auto w-full text-sm">
              <tbody>
                <tr>
                  <td className="font-semibold pr-4">Material:</td>
                  <td>100% Cotton</td>
                </tr>
                <tr>
                  <td className="font-semibold pr-4">Color:</td>
                  <td>White, Black, Brown</td>
                </tr>
                <tr>
                  <td className="font-semibold pr-4">Brand:</td>
                  <td>Vineta</td>
                </tr>
                <tr>
                  <td className="font-semibold pr-4">Size:</td>
                  <td>S, M, L, XL</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Accordion;
