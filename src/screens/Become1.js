import React, { useState, useEffect } from "react";
// import bgImage from '../assets/path_line.png';
import bgImage from '../assets/become_line.png';

import { Doughnut, Bar } from "react-chartjs-2";
import { MdArrowBack } from "react-icons/md";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Cookies from "js-cookie";
import { GrAttachment } from "react-icons/gr";
import Mobile from "./Mobile";

Chart.register(...registerables);

const Become1 = () => {

    const [progress, setProgress] = useState(20);

    const [width, setWidth] = useState();

    useEffect(() => {

        const width = window.innerWidth;
        setWidth(width);
    }, [width]);

    const createGradient = (ctx) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 150); // Vertical gradient
        gradient.addColorStop(0, "#004F99"); // Start color
        gradient.addColorStop(1, "#0084FF"); // End color
        return gradient;
    };

    const percentagePlugin = {
        id: "percentagePlugin",
        beforeDraw: (chart) => {
            const { ctx, chartArea } = chart;
            const dataset = chart.config.data.datasets[0].data;
            const percentage = dataset[0];
            const fontSize = 40;

            // Set text color and style
            ctx.font = `${fontSize}px Raleway`;
            ctx.fillStyle = "#0084FF"; // Blue color for the text
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // Calculate position (center of the doughnut)
            const x = chartArea.left + (chartArea.right - chartArea.left) / 2;
            const y = chartArea.top + (chartArea.bottom - chartArea.top) / 2;

            // Draw the percentage in the center
            ctx.fillText(`${percentage}%`, x, y);
        },
    };

    Chart.register(percentagePlugin);

    const overall = {
        labels: [],
        datasets: [
            {
                data: [79, 100 - 79],
                backgroundColor: (context) => {
                    const { ctx } = context.chart;
                    return [
                        createGradient(ctx),
                        "#C3DBFF",

                    ];
                },
                borderWidth: 0,
            },
        ],
    }


    const leverdata = [
        {
            name: "Physiological Health",
            desc: "assesses if people take up an active role in enhancing their physical well-being for optimal performance and productivity",
            icon: require("../assets/physiological-health-icon.png"),

            data: {
                labels: [],
                datasets: [
                    {
                        data: [52, 100 - 52],
                        backgroundColor: (context) => {
                            const { chart } = context;
                            const ctx = chart.ctx;
                            // const { ctx } = context.chart;
                            return [
                                createGradient(ctx),
                                "#C3DBFF",

                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },
        {
            name: "Social Health",
            desc: "assesses the sense of supportiveness, belongingness, and collaboration within the organizational fabric",
            icon: require("../assets/social-health-icon.png"),

            data: {
                labels: [],
                datasets: [
                    {
                        data: [92, 100 - 92],
                        backgroundColor: (context) => {
                            const { ctx } = context.chart;
                            return [
                                createGradient(ctx),
                                "#C3DBFF",

                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },
        {
            name: "Career Health",
            desc: "evaluates professional nurturing within the organization and provides overall security, ensuring not just job stability but a promising career",
            icon: require("../assets/career-health-icon.png"),
            data: {
                labels: [],
                datasets: [
                    {
                        data: [80, 100 - 80],
                        backgroundColor: (context) => {
                            const { ctx } = context.chart;
                            return [
                                createGradient(ctx),
                                "#C3DBFF",

                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },
        {
            name: "Financial Health",
            desc: "examines employees' financial awareness of the status quo and efforts towards economic stability",
            icon: require("../assets/financial-health-icon.png"),
            data: {
                labels: [],
                datasets: [
                    {
                        data: [41, 100 - 41],
                        backgroundColor: (context) => {
                            const { ctx } = context.chart;
                            return [
                                createGradient(ctx),
                                "#C3DBFF",

                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },
        {
            name: "Culture Health",
            desc: "explores how the practices and values followed are unique, bragworthy, and effective in crafting a great experience",
            icon: require("../assets/cultural-health-icon.png"),
            data: {
                labels: [],
                datasets: [
                    {
                        data: [92, 100 - 92],
                        backgroundColor: (context) => {
                            const { ctx } = context.chart;
                            return [
                                createGradient(ctx),
                                "#C3DBFF",

                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },
        {
            name: "Mental Health",
            desc: "examines if the workplace fosters emotional safety, ease of expression, and satisfaction for robust mental health",
            icon: require("../assets/mental-health-icon.png"),
            data: {
                labels: [],
                datasets: [
                    {
                        data: [89, 100 - 89],
                        backgroundColor: (context) => {
                            const { ctx } = context.chart;
                            return [
                                createGradient(ctx),
                                "#C3DBFF",

                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },
        {
            name: "Intellectual Health",
            desc: "indicates the level of synergy in the area to become a dynamic learning and innovative environment",
            icon: require("../assets/intellectual-health-icon.png"),
            data: {
                labels: [],
                datasets: [
                    {
                        data: [91, 100 - 91],
                        backgroundColor: (context) => {
                            const { ctx } = context.chart;
                            return [
                                createGradient(ctx),
                                "#C3DBFF",

                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },
        {
            name: "Tech & Digital Health",
            desc: "indicates how well the organization has adopted Data & Technology to be a faster, better and a smarter workplace",
            icon: require("../assets/digital-health-icon.png"),
            data: {
                labels: [],
                datasets: [
                    {
                        data: [78, 100 - 78],
                        backgroundColor: (context) => {
                            const { ctx } = context.chart;
                            return [
                                createGradient(ctx),
                                "#C3DBFF",

                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },

        {
            name: "Business Health",
            desc: "understands the perceived organizational value through brand resonance, leadership and impact creation",
            icon: require("../assets/business-health-icon.png"),
            data: {
                labels: [],
                datasets: [
                    {
                        data: [84, 100 - 84],
                        backgroundColor: (context) => {
                            const { ctx } = context.chart;
                            return [
                                createGradient(ctx),
                                "#C3DBFF",

                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },
        {
            name: "Spiritual Health",
            desc: "assesses the alignment of individual purpose and their inclination to a larger societal mission",
            icon: require("../assets/spiritual-health-icon.png"),
            data: {
                labels: [],
                datasets: [
                    {
                        data: [72, 100 - 72],
                        backgroundColor: (context) => {
                            const { ctx } = context.chart;
                            return [
                                createGradient(ctx),
                                "#C3DBFF",

                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },

    ]

    const options = {
        responsive: true,
        cutout: "85%",
        plugins: {
            datalabels: {
                display: false,
                // color: "#fff",
                // font: {
                //     weight: "bold",
                //     size: 16,
                // },
                // formatter: (value) => {
                //     return `${value}%`;
                // },
            },
        },
        elements: {
            arc: {
                borderRadius: (context) => {
                    // Apply borderRadius only for the active progress bar
                    const { datasetIndex, index } = context;
                    if (datasetIndex === 0 && index === 0) {
                        return 50; // Apply rounded corners to the active (progress) bar
                    }
                    return 0; // No rounded corners for the background (remaining) bar
                },
            },
        },
    };

    if (width <= 900) {
        return <Mobile />;
    } else {

        return (
            <div className="flex w-full justify-center items-center bg-gradient-to-t from-[#0042A6] via-[#0064FF] to-[#0042A6] flex-col">
                <div className="flex  w-full justify-between items-center mt-8 pl-[10%] pr-[18%]">
                    <img alt="twp-logo" className="w-40 h-auto" src={require("../assets/twp-logo.png")} />
                    <div className="flex justify-center items-center flex-row">
                        <p className="text-2xl text-white">You're <span className="font-bold">Certified</span></p>
                        <img alt="paperplane" src={require("../assets/paperplane.png")} className="w-10 h-auto ml-2" />
                    </div>
                </div>

                <div className="w-full mt-20 flex justify-between items-center pl-[18%] pr-[18%] -z-1">

                    <div>
                        {/* <img alt="certificate-badge" className="w-72 h-auto" src={require("../assets/badge.png")} /> */}
                    </div>
                </div>

                <div style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center top 15px", backgroundRepeat: "no-repeat", height: "100%" }} className="relative z-50 w-[80%] flex justify-center items-center overflow-visible ">
                    {/* <img alt="path_line" src={require("../assets/path_line.png")} /> */}
                    <div className="w-full">
                        <div className="w-1/2">
                            <p className="text-4xl text-[#FFED4E] font-bold">Become (Frozen Iris) is NOW a Thriving Workplace!</p>
                            <p className="text-white mt-5">We are super thrilled to honor <span className="text-[#FFED4E] font-bold">Become</span> as a Thriving Workplace!</p>
                            <p className="text-white mt-5">Become has shown an extraordinary commitment to building a workplace where people feel valued, supported, and inspired.</p>
                            <p className="text-white">By focusing on the 10 Health Levers, Become demonstrates the perfect balance of compassionate leadership and organizational excellence, building an environment that values both its people and its culture.</p>
                            <p className="text-white">This recognition celebrates their dedication to creating an environment where employees can grow, succeed, and truly thrive.</p>
                        </div>
                        <div className="flex justify-center items-center w-full mt-32">
                            <img alt="twp-elements" className="w-full h-auto" src={require("../assets/dec1.png")} />
                        </div>
                        {/* <div className="flex justify-center items-center w-full">
                        <div className="flex justify-center items-center bg-white rounded-xl p-4 mt-[15%] w-[65vw] flex-row">
                            <div>
                                <Doughnut data={overall} options={options} />

                            </div>
                            <div className="ml-4">
                                <p className="text-black font-semibold text-3xl">Unicom result</p>
                                <p>The Overall Thrive Score for Unicom reflects the organization’s collective well-being, engagement, and effectiveness across key workplace health levers. This score provides a comprehensive measure of how well Unicom supports its employees in achieving a balanced, productive, and fulfilling work experience.</p>
                                <p>Unicom excels in multiple dimensions, this reflects a workplace that nurtures holistic growth, fosters innovation, encourages meaningful connections, and provides strong career pathways. By sustaining these strengths, Unicom continues to create an environment where employees thrive both personally and professionally.</p>
                            </div>
                        </div>
                    </div> */}

                        <div className="grid grid-cols-2 gap-40 w-full mt-[60%] place-items-center z-10 rounded-3xl ">
                            {leverdata.map((lever) => {


                                return (
                                    <div className="bg-white rounded-xl w-96 h-[22rem] flex-col p-7">
                                        <div className="rounded-full border border-[#0064FF] w-24 h-24 -ml-12 -mt-12 bg-white flex justify-center items-center shadow-lg shadow-white">
                                            <img alt="physiological_health_icon" className="w-16" src={lever.icon} />
                                        </div>
                                        <div className="flex justify-center items-center flex-col -mt-[15%]">
                                            <div className="flex w-40 h-40 justify-center items-center flex-col ">
                                                <Doughnut data={lever.data} options={options} />
                                            </div>
                                            <p className="font-bold text-2xl text-center mt-3">{lever.name}</p>
                                            <p>{lever.desc}</p>

                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center mt-[7%] z-10">
                    <img alt="people1" className="w-[30%]" src={require("../assets/people1.png")} />
                    <div className="w-[20%]">
                        <p className="text-2xl text-white text-center">Do you still measure engagement, satisfaction & culture? <span className="text-[#FFE70B] font-bold">Go beyond engagement.</span></p>
                        <p className="text-2xl text-white font-bold text-center">Take the Thriving Approach.</p>
                    </div>
                    <img alt="people2" className="w-[30%]" src={require("../assets/people2.png")} />
                </div>
                <div className="w-full">
                    <img alt="people-line" src={require("../assets/people-line.png")} />
                </div>
                <div className="w-full flex justify-center items-center flex-col">
                    <a target="_blank" href="https://www.thrivingworkplace.in" className="bg-gradient-to-t from-[#FFE501] to-[#FEF073] p-3 rounded-lg font-semibold cursor-pointer">
                        <p>Visit Our Website</p>
                    </a>
                    <p className="text-white font-semibold mt-3 text-xl">Make your organization a Thriving workplace</p>
                </div>
                <div className="w-full flex justify-center items-center flex-col mt-11">
                    <div className="w-[70%] bg-white rounded-xl flex justify-around items-center pt-5 pb-5 mb-10">
                        <div>
                            <div className="flex  items-center flex-row">
                                <p className="text-[#0042A6] font-bold text-lg">About Aspire</p>
                                <img alt="arrow-mark" className="w-[20px] h-[20px] ml-2" src={require("../assets/arrow.png")} />
                            </div>
                            <p className="text-lg">Contact <span className="underline">krishna.prasad@spigroup.in</span></p>
                            <p className="text-lg">Email <span className="underline">+91 94458 95581</span></p>
                            <div className="w-[70%] mt-8">
                                <p className="text-[#0042A6] font-semibold text-3xl">Become the Employer of Choice.</p>
                            </div>
                            <div className="mt-10 flex justify-center items-center flex-row">
                                <input placeholder="| Enter your business email" className="rounded-l-lg border border-r-transparent border-[#0042A6] p-2" />
                                <div className="bg-gradient-to-t from-[#FFE501] to-[#FEF073] p-3 rounded-lg font-semibold cursor-pointer">
                                    <p>Get Certified Today</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-80 h-auto">
                            <img alt="people" src={require("../assets/people.png")} />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Become1;