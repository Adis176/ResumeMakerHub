

const removeArraysFromItems = (obj) => {
    // Base case: if obj is not an object, return it as is
    if (typeof obj !== 'object' || obj === null) {
        console.log("not processed")
        return obj;
    }

    // If the object has 'items' property, process it
    if (Array.isArray(obj.items)) {
        obj.items = obj.items.map(item => {
            // For each item in 'items', check if it is an object
            if (typeof item === 'object' && item !== null) {
                // Recursively process each property of the object
                const newItem = {};
                for (const key in item) {
                    if (item.hasOwnProperty(key)) {
                        newItem[key] = removeArraysFromItems(item[key]);
                    }
                }
                return newItem;
            }
            return item;
        });
    }

    // Recursively process each property of the object
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && key !== 'items') {
            obj[key] = removeArraysFromItems(obj[key]);
        }
    }

    return obj;
};

// Example JSON data
const jsonData = {
    "data": [
    {
      "segment_title": "objective",
      "items": [
        {
          "attribute1": [
            {
              "format": "",
              "main": "My main objective in life is to complete this resume maker project for now. Learn more back-end",
              "placeholder": "Objective",
              "req": false
            }
          ]
        }
      ]
    },
    {
      "segment_title": "education",
      "items": [
        {
          "institute": [
            {
              "format": "",
              "main": "georgia-Tech",
              "placeholder": "Institute",
              "req": true
            }
          ],
          "duration": [
            {
              "format": "",
              "main": "Aug 2023 - Aug 2025",
              "placeholder": "Education Duration",
              "req": false
            }
          ],
          "level": [
            {
              "format": "",
              "main": "masters in compiter science",
              "placeholder": "Education level",
              "req": true
            }
          ],
          "grade": [
            {
              "format": "",
              "main": "3.86 / 4.00",
              "placeholder": "Education Grade",
              "req": false
            }
          ],
          "features": {
            "format": "",
            "main": "There are not many features associated wt Gatech.",
            "placeholder": "Feature Details",
            "req": false
          }
        },
        {
          "institute": [
            {
              "format": "",
              "main": "Pandit Deendayal Energy Institute - PDEU",
              "placeholder": "Institute",
              "req": true
            }
          ],
          "duration": [
            {
              "format": "",
              "main": "Aug 2019 - May 2023",
              "placeholder": "Education Duration",
              "req": false
            }
          ],
          "level": [
            {
              "format": "",
              "main": "Bachelors of technology",
              "placeholder": "Education level",
              "req": true
            }
          ],
          "grade": [
            {
              "format": "",
              "main": "9.86 / 10.00",
              "placeholder": "Education Grade",
              "req": false
            }
          ],
          "features": {
            "format": "",
            "main": "",
            "placeholder": "Feature Details",
            "req": false
          }
        }
      ]
    },
    {
      "segment_title": "work-experience",
      "items": [
        {
          "organization": [
            {
              "format": "",
              "main": "Cling Multi-Solutions",
              "placeholder": "Organization",
              "req": true
            }
          ],
          "duration": [
            {
              "format": "",
              "main": "January 2023 - June 2023",
              "placeholder": "Career Duration",
              "req": false
            }
          ],
          "role": [
            {
              "format": "",
              "main": "SDE Intern",
              "placeholder": "Career Role",
              "req": true
            }
          ],
          "location": [
            {
              "format": "",
              "main": "Pune, Maharashtra",
              "placeholder": "Career Location",
              "req": false
            }
          ],
          "features": {
            "format": "",
            "main": "work-str1. ho hasnt. tell mah.",
            "placeholder": "Feature Details",
            "req": false
          }
        },
        {
          "organization": [
            {
              "format": "",
              "main": "eInfoChips org",
              "placeholder": "Organization",
              "req": true
            }
          ],
          "duration": [
            {
              "format": "",
              "main": "May 2022 - July 2022",
              "placeholder": "Career Duration",
              "req": false
            }
          ],
          "role": [
            {
              "format": "",
              "main": "Summer Intern",
              "placeholder": "Career Role",
              "req": true
            }
          ],
          "location": [
            {
              "format": "",
              "main": "Remote",
              "placeholder": "Career Location",
              "req": false
            }
          ],
          "features": {
            "format": "",
            "main": "",
            "placeholder": "Feature Details",
            "req": false
          }
        }
      ]
    },
    {
      "segment_title": "projects",
      "items": [
        {
          "title": [
            {
              "format": "",
              "main": "Portfolio Website | ReactJS, Framer-Motion, ts Particles, Three.js, JavaScript, SCSS",
              "placeholder": "Project Title",
              "req": true
            }
          ],
          "duration": [
            {
              "format": "",
              "main": "",
              "placeholder": "Project Duration",
              "req": false
            }
          ],
          "details": {
            "format": "",
            "main": "",
            "placeholder": "Project Details",
            "req": true
          },
          "ref": {
            "format": "",
            "main": "",
            "placeholder": "Project Reference",
            "req": false
          },
          "features": {
            "format": "",
            "main": "Constructed a personalized portfolio website through ReactJS framework. Deployed tsParticles.js library for an interactive background, leading to 40% increase in user interactions. \u2022 Employed animations through Framer-motion library for elevated user view-ability.\u2022 Incorporated custom 3D objects using the Three.js library to demonstrate advanced web development skills.3",
            "placeholder": "Feature Details",
            "req": false
          }
        },
        {
          "title": [
            {
              "format": "",
              "main": "B+ Tree Implementation | C++",
              "placeholder": "Project Title",
              "req": true
            }
          ],
          "duration": [
            {
              "format": "",
              "main": "",
              "placeholder": "Project Duration",
              "req": false
            }
          ],
          "details": {
            "format": "",
            "main": "",
            "placeholder": "Project Details",
            "req": true
          },
          "ref": {
            "format": "",
            "main": "",
            "placeholder": "Project Reference",
            "req": false
          },
          "features": {
            "format": "",
            "main": "Engineered a B+-Tree from scratch, supporting lookup, insert and delete operations. \u2022 Designed it as a template, allowing custom key and value types, comparators and page size at compile time.\u2022 Leverages page-ids and buffer-manager instead of pointers for node resolution, for 50% faster data retrieval and management. Implemented node splitting and merging logic for refined balance in the tree.",
            "placeholder": "Feature Details",
            "req": false
          }
        }
      ]
    },
    {
      "segment_title": "certificates",
      "items": [
        {
          "title": {
            "format": "",
            "main": "Leetcode Guardian badge achieved",
            "placeholder": "Project Title",
            "req": true
          },
          "details": {
            "format": "",
            "main": "",
            "placeholder": "Project Details",
            "req": false
          },
          "features": {
            "format": "",
            "main": "ReactJS, NextJS, Framer Motion, Three.js, Bootstrap, Tailwind, Django, Tensorflow, Numpy, Keras",
            "placeholder": "Feature Details",
            "req": false
          }
        },
        {
          "title": {
            "format": "",
            "main": "Management Head at HackerEarth PDEU Student Chapter",
            "placeholder": "Project Title",
            "req": true
          },
          "details": {
            "format": "",
            "main": "",
            "placeholder": "Project Details",
            "req": false
          },
          "features": {
            "format": "",
            "main": "ReactJS, NextJS, Framer Motion, Three.js, Bootstrap, Tailwind, Django, Tensorflow, Numpy, Keras",
            "placeholder": "Feature Details",
            "req": false
          }
        }
      ]
    },
    {
      "segment_title": "skills",
      "items": [
        {
          "title": {
            "format": "",
            "main": "technical skills",
            "placeholder": "Skill Title",
            "req": false
          },
          "features": {
            "format": "",
            "main": "ReactJS, NextJS, Framer Motion, Three.js, Bootstrap, Tailwind, Django, Tensorflow, Numpy, Keras",
            "placeholder": "Feature Details",
            "req": false
          }
        },
        {
          "title": {
            "format": "",
            "main": "Libraries",
            "placeholder": "Skill Title",
            "req": false
          },
          "features": {
            "format": "",
            "main": "ReactJS, NextJS, Framer Motion, Three.js, Bootstrap, Tailwind, Django, Tensorflow, Numpy, Keras",
            "placeholder": "Feature Details",
            "req": false
          }
        }
      ]
    },
    {
      "segment_title": "languages",
      "items": [
        {
          "title": {
            "format": "",
            "main": "English",
            "placeholder": "Languages known",
            "req": false
          },
          "features": [
            "I mastered English during my GRE prep. I also scored 8 bands in IELTS"
          ]
        },
        {
          "title": {
            "format": "",
            "main": "Gujarati",
            "placeholder": "Languages known",
            "req": false
          },
          "features": {
            "format": "",
            "main": "",
            "placeholder": "Feature Details",
            "req": false
          }
        }
      ]
    },
    {
      "segment_title": "extracurricular",
      "items": [
        {
          "title": {
            "format": "",
            "main": "EM head at HackerEarth PDEU Student Chapter",
            "placeholder": "Extracurricular Activities",
            "req": false
          },
          "features": ["I did 8all during my tenure. just did 2 contests."]
        },
        {
          "title": {
            "format": "",
            "main": "Documentation head at Envirofreaks - didnot turn out well",
            "placeholder": "Extracurricular Activities",
            "req": false
          },
          "features": {
            "format": "",
            "main": "",
            "placeholder": "Feature Details",
            "req": false
          }
        }
      ]
    },
    {
      "segment_title": "BASE",
      "items": [
        {
          "attribute1": {
            "format": "",
            "main": "",
            "placeholder": "First Attribute Details",
            "req": false
          },
          "attribute2": {
            "format": "",
            "main": "",
            "placeholder": "Second Attribute Details",
            "req": false
          },
          "attribute3": {
            "format": "",
            "main": "",
            "placeholder": "Third Attribute Details",
            "req": false
          },
          "attribute4": {
            "format": "",
            "main": "",
            "placeholder": "Fourth Attribute Details",
            "req": false
          },
          "features": {
            "format": "",
            "main": "",
            "placeholder": "Feature Details",
            "req": false
          }
        },
        {
          "attribute1": {
            "format": "",
            "main": "",
            "placeholder": "First Attribute Details",
            "req": false
          },
          "attribute2": {
            "format": "",
            "main": "",
            "placeholder": "Second Attribute Details",
            "req": false
          },
          "attribute3": {
            "format": "",
            "main": "",
            "placeholder": "Third Attribute Details",
            "req": false
          },
          "attribute4": {
            "format": "",
            "main": "",
            "placeholder": "Fourth Attribute Details",
            "req": false
          },
          "features": {
            "format": "",
            "main": "",
            "placeholder": "Feature Details",
            "req": false
          }
        }
      ]
    }
  ]
};



const processedData = removeArraysFromItems(jsonData);

// Output the result
console.log(JSON.stringify(processedData, null, 2));
