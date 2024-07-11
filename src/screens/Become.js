import React, { useState, useEffect, useRef } from "react";
import { BELOW_80, HOST_NAME } from "./const";
import { Doughnut, Bar } from "react-chartjs-2";
import "./Become.css";
import { MdArrowBack } from "react-icons/md";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Cookies from "js-cookie";
import { GrAttachment } from "react-icons/gr";
Chart.register(...registerables);

const Become = () => {
  const chartRefs = useRef([]);

  const [levers, setLevers] = useState([]);
  const [category, setCategory] = useState([]);
  const [isDashboard, setIsDashboard] = useState(true);
  const [leverDetailsIndex, setLeverDetailsIndex] = useState(null);

  const [inferences, setInferences] = useState();
  const [insights, setInsights] = useState();

  const [customerName, setCustomerName] = useState();

  const createGradient = (ctx, progress) => {
    const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
    gradient.addColorStop(progress, "#CCE0FF");
    gradient.addColorStop(0, "#2860B5");
    return gradient;
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${HOST_NAME}/route/get-health-score`, {
          method: "GET",
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6MiwiaWF0IjoxNzE5OTg4MTkzfQ.bDdU950wwmk298RwAMD8VBRWvA0flRhREPyxtvIpboI",
          },
        })
        .then((res) => {
          setLevers(res.data.levers);
          console.log(res.data.category);
          setCategory(res.data.category);
        })
        .catch((err) => console.log(err));
    };

    const fetchInference = async () => {
      await axios
        .get(`${HOST_NAME}/route/get-inferences`, {
          method: "GET",
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6MiwiaWF0IjoxNzE5OTg4MTkzfQ.bDdU950wwmk298RwAMD8VBRWvA0flRhREPyxtvIpboI",
          },
        })
        .then((res) => {
          setInferences(res.data.data.levers);
        })
        .catch((err) => console.log(err));
    };

    const fetchInsights = async () => {
      await axios
        .get(`${HOST_NAME}/route/get-insights`, {
          method: "GET",
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6MiwiaWF0IjoxNzE5OTg4MTkzfQ.bDdU950wwmk298RwAMD8VBRWvA0flRhREPyxtvIpboI",
          },
        })
        .then((res) => {
          setInsights(res.data.data.levers);
        })
        .catch((err) => console.log(err));
    };

    const fetchCustomer = async () => {
      await axios
        .get(`${HOST_NAME}/route/get-customer`, {
          method: "GET",
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6MiwiaWF0IjoxNzE5OTg4MTkzfQ.bDdU950wwmk298RwAMD8VBRWvA0flRhREPyxtvIpboI",
          },
        })
        .then((res) => {
          console.log(res.data.data);
          setCustomerName(res.data.data.name);
        })
        .catch((err) => console.log(err));
    };

    fetchInference();
    fetchInsights();
    fetchCustomer();
    fetchData();

    Object.keys(levers).forEach((key, index) => {
      const chartRef = chartRefs.current[index];
      if (chartRef) {
        const ctx = chartRef.getContext("2d");
        const score = levers[key];
        const data = [score, 100 - score];
        const total = data.reduce((acc, value) => acc + value, 0);
        const progress = data[0] / total;
        const gradient = createGradient(ctx, progress);

        new Chart(ctx, {
          type: "doughnut", // Example chart type
          data: {
            datasets: [
              {
                data,
                backgroundColor: [
                  gradient,
                  "rgba(200, 200, 200, 0.5)", // Background color for the remaining segment
                ],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      }
    });
  }, []);

  const physiological = {
    datasets: [
      {
        data: [
          levers["Physiological Health"],
          100 - levers["Physiological Health"],
        ],
        backgroundColor: [
          levers["Physiological Health"] < 80 ? BELOW_80 : "#278AFF",
          "#ccc",
        ],
      },
    ],
  };
  const mental = {
    datasets: [
      {
        data: [levers["Mental Health"], 100 - levers["Mental Health"]],
        backgroundColor: [
          levers["Mental Health"] < 80 ? BELOW_80 : "#278AFF",
          "#ccc",
        ],
      },
    ],
  };
  const social = {
    datasets: [
      {
        data: [levers["Social Health"], 100 - levers["Social Health"]],
        backgroundColor: [
          levers["Social Health"] < 80 ? BELOW_80 : "#278AFF",
          "#ccc",
        ],
      },
    ],
  };
  const financial = {
    datasets: [
      {
        data: [levers["Financial Health"], 100 - levers["Financial Health"]],
        backgroundColor: [
          levers["Financial Health"] < 80 ? BELOW_80 : "#278AFF",
          "#ccc",
        ],
      },
    ],
  };
  const cultural = {
    datasets: [
      {
        data: [levers["Cultural Health"], 100 - levers["Cultural Health"]],
        backgroundColor: [
          levers["Cultural Health"] < 80 ? BELOW_80 : "#278AFF",
          "#ccc",
        ],
      },
    ],
  };
  const spiritual = {
    datasets: [
      {
        data: [levers["Spiritual Health"], 100 - levers["Spiritual Health"]],
        backgroundColor: [
          levers["Spiritual Health"] < 80 ? BELOW_80 : "#278AFF",
          "#ccc",
        ],
      },
    ],
  };
  const digital = {
    datasets: [
      {
        data: [
          levers["Digital and Tech Health"],
          100 - levers["Digital and Tech Health"],
        ],
        backgroundColor: [
          levers["Digital and Tech Health"] < 80 ? BELOW_80 : "#278AFF",
          "#ccc",
        ],
      },
    ],
  };
  const business = {
    datasets: [
      {
        data: [levers["Business Health"], 100 - levers["Business Health"]],
        backgroundColor: [
          levers["Business Health"] < 80 ? BELOW_80 : "#278AFF",
          "#ccc",
        ],
      },
    ],
  };
  const intellectual = {
    datasets: [
      {
        data: [
          levers["Intellectual Health"],
          100 - levers["Intellectual Health"],
        ],
        backgroundColor: [
          levers["Intellectual Health"] < 80 ? BELOW_80 : "#278AFF",
          "#ccc",
        ],
      },
    ],
  };
  const career = {
    datasets: [
      {
        data: [levers["Career Health"], 100 - levers["Career Health"]],
        backgroundColor: [
          levers["Career Health"] < 80 ? BELOW_80 : "#278AFF",
          "#ccc",
        ],
      },
    ],
  };

  return (
    <div style={{ paddingLeft: "10%", marginTop: "5%" }}>
      <div className="welcome-note">
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor:
              "linear-gradient(to right,rgba(0, 66, 166, 0.2),rgba(0, 66, 166, 1))",
            padding: "20px",
          }}
        >
          <p className="welcome-title">Become is now a Thriving Workplace!</p>
          <p className="welcome-content">
            <span>
              Become has achieved a benchmark score of 75% across 6 levers,
              highlighting our commitment to excellence. This achievement
              reflects our dedication to fostering a supportive and engaging
              work environment for all our employees.
            </span>
            <br />
            <span>We are honored to announce Become a Thriving Workplace.</span>
          </p>
        </div>
        {/* <div style={{ width: "80%" }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={require("../assets/welcome-card.png")}
            />
          </div> */}
      </div>

      <p
        style={{
          color: "#30373E",
          fontSize: "24px",
          fontWeight: "600",
          width: "90%",
        }}
      >
        Health Levers
      </p>
      <div className="lever-container">
        <div
          className="lever-card"
          onClick={() => {
            setIsDashboard(false);
            setLeverDetailsIndex(1);
          }}
        >
          <div className="lever-header">
            <div className="lever-icon">
              <img
                style={{ width: "40px", height: "40px" }}
                src={require("../assets/physiological-health-icon.png")}
              />
            </div>
            <p className="lever-name">Physiological Health</p>
          </div>
          <div className="lever-graph">
            <div style={{ width: "180px", height: "180px" }}>
              <Doughnut
                data={physiological}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: true,
                    },
                  },
                  rotation: 0,
                  circumference: 360,
                  cutout: "70%",
                  maintainAspectRatio: true,
                  responsive: true,
                }}
              />
              <p
                style={{
                  position: "relative",
                  left: "70px",
                  top: "-130px",
                  color: "#30373E",
                }}
              >
                Score
              </p>
              <p
                style={{
                  position: "relative",
                  left: "75px",
                  top: "-140px",
                  color: "#30373E",
                }}
              >
                {levers["Physiological Health"]}%
              </p>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Wellbeing"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Well-Being</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Movement"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Movement</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Energy"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Energy</p>
              </div>
            </div>
          </div>
          <p>
            Physiological Health assesses if people take up an active role in
            enhancing their physical well-being for optimal performance and
            productivity
          </p>
        </div>
        <div
          className="lever-card"
          onClick={() => {
            setIsDashboard(false);
            setLeverDetailsIndex(4);
          }}
        >
          <div className="lever-header">
            <div className="lever-icon">
              <img
                style={{ width: "40px", height: "40px" }}
                src={require("../assets/mental-health-icon.png")}
              />
            </div>
            <p className="lever-name">Mental Health</p>
          </div>
          <div className="lever-graph">
            <div style={{ width: "180px", height: "180px" }}>
              <Doughnut
                data={mental}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: true,
                    },
                  },
                  rotation: 0,
                  circumference: 360,
                  cutout: "70%",
                  maintainAspectRatio: true,
                  responsive: true,
                }}
              />
              <p
                style={{
                  position: "relative",
                  left: "70px",
                  top: "-130px",
                  color: "#30373E",
                }}
              >
                Score
              </p>
              <p
                style={{
                  position: "relative",
                  left: "75px",
                  top: "-140px",
                  color: "#30373E",
                }}
              >
                {levers["Mental Health"]}%
              </p>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Motivation"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Motivation</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Support"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Support</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Expression"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Expression</p>
              </div>
            </div>
          </div>
          <p>
            Mental Health examines if the workplace fosters emotional safety,
            ease of expression, and satisfaction for robust mental health
          </p>
        </div>
        <div
          className="lever-card"
          onClick={() => {
            setIsDashboard(false);
            setLeverDetailsIndex(0);
          }}
        >
          <div className="lever-header">
            <div className="lever-icon">
              <img
                style={{ width: "40px", height: "40px" }}
                src={require("../assets/business-health-icon.png")}
              />
            </div>
            <p className="lever-name">Business Health</p>
          </div>
          <div className="lever-graph">
            <div style={{ width: "180px", height: "180px" }}>
              <Doughnut
                data={business}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: true,
                    },
                  },
                  rotation: 0,
                  circumference: 360,
                  cutout: "70%",
                  maintainAspectRatio: true,
                  responsive: true,
                }}
              />
              <p
                style={{
                  position: "relative",
                  left: "70px",
                  top: "-130px",
                  color: "#30373E",
                }}
              >
                Score
              </p>
              <p
                style={{
                  position: "relative",
                  left: "75px",
                  top: "-140px",
                  color: "#30373E",
                }}
              >
                {levers["Business Health"]}%
              </p>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "-40px",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Leadership"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Leadership</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Brand"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Brand</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Benefits"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px", width: "76px" }}>
                  Compensation & benefits
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Competence"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Competence</p>
              </div>
            </div>
          </div>
          <p>
            Business Health understands the perceived organizational value
            through brand resonance, leadership and impact creation.
          </p>
        </div>
        <div
          className="lever-card"
          onClick={() => {
            setIsDashboard(false);
            setLeverDetailsIndex(2);
          }}
        >
          <div className="lever-header">
            <div className="lever-icon">
              <img
                style={{ width: "40px", height: "40px" }}
                src={require("../assets/financial-health-icon.png")}
              />
            </div>
            <p className="lever-name">Financial Health</p>
          </div>
          <div className="lever-graph">
            <div style={{ width: "180px", height: "180px" }}>
              <Doughnut
                data={financial}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: true,
                    },
                  },
                  rotation: 0,
                  circumference: 360,
                  cutout: "70%",
                  maintainAspectRatio: true,
                  responsive: true,
                }}
              />
              <p
                style={{
                  position: "relative",
                  left: "70px",
                  top: "-130px",
                  color: "#30373E",
                }}
              >
                Score
              </p>
              <p
                style={{
                  position: "relative",
                  left: "75px",
                  top: "-140px",
                  color: "#30373E",
                }}
              >
                {levers["Financial Health"]}%
              </p>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Status quo"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Status quo</p>
              </div>
            </div>
          </div>
          <p>
            Financial Health examines employees' financial awareness of the
            status quo and efforts towards economic stability.
          </p>
        </div>
        <div
          className="lever-card"
          onClick={() => {
            setIsDashboard(false);
            setLeverDetailsIndex(5);
          }}
        >
          <div className="lever-header">
            <div className="lever-icon">
              <img
                style={{ width: "40px", height: "40px" }}
                src={require("../assets/cultural-health-icon.png")}
              />
            </div>
            <p className="lever-name">Cultural Health</p>
          </div>
          <div className="lever-graph">
            <div style={{ width: "180px", height: "180px" }}>
              <Doughnut
                data={cultural}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: true,
                    },
                  },
                  rotation: 0,
                  circumference: 360,
                  cutout: "70%",
                  maintainAspectRatio: true,
                  responsive: true,
                }}
              />
              <p
                style={{
                  position: "relative",
                  left: "70px",
                  top: "-130px",
                  color: "#30373E",
                }}
              >
                Score
              </p>
              <p
                style={{
                  position: "relative",
                  left: "75px",
                  top: "-140px",
                  color: "#30373E",
                }}
              >
                {levers["Cultural Health"]}%
              </p>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "-40px",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Values"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Values</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Practices"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Practices</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Ethics"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Ethics</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Places"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Places</p>
              </div>
            </div>
          </div>
          <p>
            Cultural Health explores how the practices and values followed are
            unique, bragworthy, and effective in crafting a great experience
          </p>
        </div>
        <div
          className="lever-card"
          onClick={() => {
            setIsDashboard(false);
            setLeverDetailsIndex(8);
          }}
        >
          <div className="lever-header">
            <div className="lever-icon">
              <img
                style={{ width: "40px", height: "40px" }}
                src={require("../assets/spiritual-health-icon.png")}
              />
            </div>
            <p className="lever-name">Spiritual Health</p>
          </div>
          <div className="lever-graph">
            <div style={{ width: "180px", height: "180px" }}>
              <Doughnut
                data={spiritual}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: true,
                    },
                  },
                  rotation: 0,
                  circumference: 360,
                  cutout: "70%",
                  maintainAspectRatio: true,
                  responsive: true,
                }}
              />
              <p
                style={{
                  position: "relative",
                  left: "70px",
                  top: "-130px",
                  color: "#30373E",
                }}
              >
                Score
              </p>
              <p
                style={{
                  position: "relative",
                  left: "75px",
                  top: "-140px",
                  color: "#30373E",
                }}
              >
                {levers["Spiritual Health"]}%
              </p>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Purpose"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Purpose</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Impact"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Impact</p>
              </div>
            </div>
          </div>
          <p>
            Spiritual Health assesses the alignment of individual purpose and
            their inclination to a larger societal mission
          </p>
        </div>
        <div
          className="lever-card"
          onClick={() => {
            setIsDashboard(false);
            setLeverDetailsIndex(3);
          }}
        >
          <div className="lever-header">
            <div className="lever-icon">
              <img
                style={{ width: "40px", height: "40px" }}
                src={require("../assets/intellectual-health-icon.png")}
              />
            </div>
            <p className="lever-name">Intellectual Health</p>
          </div>
          <div className="lever-graph">
            <div style={{ width: "180px", height: "180px" }}>
              <Doughnut
                data={intellectual}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: true,
                    },
                  },
                  rotation: 0,
                  circumference: 360,
                  cutout: "70%",
                  maintainAspectRatio: true,
                  responsive: true,
                }}
              />
              <p
                style={{
                  position: "relative",
                  left: "70px",
                  top: "-130px",
                  color: "#30373E",
                }}
              >
                Score
              </p>
              <p
                style={{
                  position: "relative",
                  left: "75px",
                  top: "-140px",
                  color: "#30373E",
                }}
              >
                {levers["Intellectual Health"]}%
              </p>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Learning"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Learning</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Innovation"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Innovation</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Fitment"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Fitment</p>
              </div>
            </div>
          </div>
          <p>
            Intellectual Health indicates the level of synergy in the area to
            become a dynamic learning and innovative environment.
          </p>
        </div>
        <div
          className="lever-card"
          onClick={() => {
            setIsDashboard(false);
            setLeverDetailsIndex(7);
          }}
        >
          <div className="lever-header">
            <div className="lever-icon">
              <img
                style={{ width: "40px", height: "40px" }}
                src={require("../assets/social-health-icon.png")}
              />
            </div>
            <p className="lever-name">Social Health</p>
          </div>
          <div className="lever-graph">
            <div style={{ width: "180px", height: "180px" }}>
              <Doughnut
                data={social}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: true,
                    },
                  },
                  rotation: 0,
                  circumference: 360,
                  cutout: "70%",
                  maintainAspectRatio: true,
                  responsive: true,
                }}
              />
              <p
                style={{
                  position: "relative",
                  left: "70px",
                  top: "-130px",
                  color: "#30373E",
                }}
              >
                Score
              </p>
              <p
                style={{
                  position: "relative",
                  left: "75px",
                  top: "-140px",
                  color: "#30373E",
                }}
              >
                {levers["Social Health"]}%
              </p>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Collaboration"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Collaboration</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Community"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Community</p>
              </div>
            </div>
          </div>
          <p>
            Social Health assesses the sense of supportiveness, belongingness,
            and collaboration within the organizational fabric
          </p>
        </div>
        <div
          className="lever-card"
          onClick={() => {
            setIsDashboard(false);
            setLeverDetailsIndex(6);
          }}
        >
          <div className="lever-header">
            <div className="lever-icon">
              <img
                style={{ width: "40px", height: "40px" }}
                src={require("../assets/career-health-icon.png")}
              />
            </div>
            <p className="lever-name">Career Health</p>
          </div>
          <div className="lever-graph">
            <div style={{ width: "180px", height: "180px" }}>
              <Doughnut
                data={career}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: true,
                    },
                  },
                  rotation: 0,
                  circumference: 360,
                  cutout: "70%",
                  maintainAspectRatio: true,
                  responsive: true,
                }}
              />
              <p
                style={{
                  position: "relative",
                  left: "70px",
                  top: "-130px",
                  color: "#30373E",
                }}
              >
                Score
              </p>
              <p
                style={{
                  position: "relative",
                  left: "75px",
                  top: "-140px",
                  color: "#30373E",
                }}
              >
                {levers["Career Health"]}%
              </p>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Recognition"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Recognition</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Mentorship"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Mentorship</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Learning"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Growth</p>
              </div>
            </div>
          </div>
          <p>
            Career Health evaluates professional nurturing within the
            organization and provides overall security, ensuring not just job
            stability but a promising career
          </p>
        </div>
        <div
          className="lever-card"
          onClick={() => {
            setIsDashboard(false);
            setLeverDetailsIndex(9);
          }}
        >
          <div className="lever-header">
            <div className="lever-icon">
              <img
                style={{ width: "40px", height: "40px" }}
                src={require("../assets/digital-health-icon.png")}
              />
            </div>
            <p className="lever-name">Digital and Tech Health</p>
          </div>
          <div className="lever-graph">
            <div style={{ width: "180px", height: "180px" }}>
              <Doughnut
                data={digital}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: true,
                    },
                  },
                  rotation: 0,
                  circumference: 360,
                  cutout: "70%",
                  maintainAspectRatio: true,
                  responsive: true,
                }}
              />
              <p
                style={{
                  position: "relative",
                  left: "70px",
                  top: "-130px",
                  color: "#30373E",
                }}
              >
                Score
              </p>
              <p
                style={{
                  position: "relative",
                  left: "75px",
                  top: "-140px",
                  color: "#30373E",
                }}
              >
                {levers["Digital and Tech Health"]}%
              </p>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Adeptness"] < 75 ? BELOW_80 : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Adeptness</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  className="category-point"
                  style={{
                    backgroundColor:
                      category["Availability and Access"] < 75
                        ? BELOW_80
                        : "#278AFF",
                  }}
                />
                <p style={{ marginLeft: "10px" }}>Availability and Access</p>
              </div>
            </div>
          </div>
          <p>
            Tech & Digital Health indicates how well the organization has
            adopted Data & Technology to be a faster, better and a smarter
            workplace
          </p>
        </div>
      </div>
    </div>
  );
};

export default Become;
